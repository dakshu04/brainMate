'use server'

import { getDbConnection } from "@/lib/db"
import { generatePdfSummaryFromGemini } from "@/lib/geminiai"
import { fetchAndExtractPdfText } from "@/lib/langchain"
import { generateSummaryFromOpenAI } from "@/lib/openai"
import { formatFileNameAsTitle } from "@/utils/format-utils"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"


// Shape returned by UploadThing `startUpload`
export type UploadThingResponse = {
  url: string
  name: string
  key?: string
  serverData?: {
    userId?: string
    [k: string]: unknown
  }
}

export async function generatePdfSummary(
  uploadResponse: UploadThingResponse[]
) {
  if (!Array.isArray(uploadResponse) || uploadResponse.length === 0) {
    return { success: false, message: "File upload failed: empty response", data: null }
  }

  // Take the first file
  const first = uploadResponse[0]
  const pdfUrl = first?.url
  const fileName = first?.name
  const userId = first?.serverData?.userId ?? "unknown"

  if (!pdfUrl) {
    return { success: false, message: "File URL missing", data: null }
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl)
    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText)
      if (!summary) {
        return { success: false, message: "Failed to generate summary", data: null }
      }

      const formattedFileName = formatFileNameAsTitle(fileName)

      return {
        success: true,
        message: "Summary generated successfully",
        data: { title: formattedFileName,  summary },
      }
    } catch (err: unknown) {
      // Give a helpful error message back to the client
      if (err instanceof Error && err.message === "RATE_LIMIT_EXCEEDED") {
        try {
  const summary = await generatePdfSummaryFromGemini(pdfText);
        if (!summary) {
          return { success: false, message: "Gemini returned no summary", data: null };
        }

        return {
          success: true,
          message: "✅Summary generated successfully",
          data: { userId, fileName, pdfUrl, summary },
        };
      } catch (error: any) {
        console.error("Gemini summary error:", error);
        return {
          success: false,
          message: error.message || "Summary generation failed due to an unexpected error.",
          data: null,
        };
      }
      }
      console.error("OpenAI summary error:", err)
      return {
        success: false,
        message: "Summary generation failed due to an unexpected error.",
        data: null,
      }
    }
  } catch (error) {
    console.error("Error extracting PDF text:", error)
    return { success: false, message: "File processing failed", data: null }
  }
}


async function savePdfSummary({userId, fileUrl, summary, title,fileName}: {
  userId?: string,
  fileUrl: string,
  summary: string,
  title: string,
  fileName: string
}) {
  // sql inserting pdf summary
  try {
    const sql = await getDbConnection()
    const [savedSummary] = await sql`
    INSERT INTO pdf_summaries(
      user_id, 
      original_file_url,
      summary_text,
      title,
      file_name
    )
    VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName} 
    ) RETURNING id, summary_text`
    return savedSummary
  } catch (error) {
    console.log('Error saving PDF summary', error)
    throw error
  }
}

interface PdfSummaryType {
  userId?: string,
  fileUrl: string,
  summary: string,
  title: string,
  fileName: string,
}

export async function storePdfSummaryAction({
      fileUrl,
      summary,
      title,
      fileName,
}: PdfSummaryType) {
  // user is logged in and has a userId
  // savePdfSummary()
  // savePdfSummary()
  
  let savedSummary: any;

  try {
    const { userId } = await auth()

    if(!userId) {
      return {
      success: false,
      message: 'User not found'
    }
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName
    })

    if(!savedSummary) {
      
      return {
        success: false,
        message: 'Failed to save summary, please try again...'
      }
    }
    console.log("📝 Storing summary:", { userId, fileUrl, summary, title, fileName })
    
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message: 'Error saving PDF summary'
    }
  }

  //Revalidate our cache --??
  revalidatePath(`/summaries/${savedSummary.id}`)

  return {
      success: true,
      message: "PDF summary saved successfully",
      data: {
        id: savedSummary.id
      }
    }
}