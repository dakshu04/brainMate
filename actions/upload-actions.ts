'use server'

import { generatePdfSummaryFromGemini } from "@/lib/geminiai"
import { fetchAndExtractPdfText } from "@/lib/langchain"
import { generateSummaryFromOpenAI } from "@/lib/openai"
import { summary } from "motion/react-client"

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

      return {
        success: true,
        message: "Summary generated successfully",
        data: { userId, fileName, pdfUrl, summary },
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
          message: "Summary generated successfully",
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
