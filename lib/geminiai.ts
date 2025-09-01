import { GoogleGenAI } from "@google/genai";
import { SUMMARY_SYSTEM_PROMPT } from "./prompts";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generatePdfSummaryFromGemini(
  pdfText: string
): Promise<string> {
  try {
    const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
        {
        role: "user",
        parts: [
            {
            text: `${SUMMARY_SYSTEM_PROMPT}\n\nHere is the extracted resume text:\n\n${pdfText}`,
            },
        ],
        },
    ],
    });

    if (!response.text) {
    throw new Error("Gemini returned empty text.");
    }
return response.text;

  } catch (err: any) {
    console.error("Gemini API error:", err);
    throw err;
  }
}
