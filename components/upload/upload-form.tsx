'use client'

import UploadFormInput from "@/components/upload/upload-form-input"
import { useUploadThing } from "@/utils/uploadthing"
import { toast } from "sonner"
import { z } from "zod"
import { generatePdfSummary, type UploadThingResponse } from "@/actions/upload-actions"
import { useRef, useState } from "react"

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, "File size must be less than 20MB")
    .refine((file) => file.type.startsWith("application/pdf"), "File must be a PDF"),
})

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)


  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!")
    },
    onUploadError: (err) => {
      console.error("error occured while uploading", err)
      toast("❌ Error occurred while uploading")
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      const file = formData.get("file") as File

      const validated = schema.safeParse({ file })
      if (!validated.success) {
        toast(validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file")
        setIsLoading(false)
        return
      }

      toast("📤 Uploading your PDF...")
      const resp = await startUpload([file])

      if (!resp || resp.length === 0) {
        toast("❌ Upload failed, try another file")
        setIsLoading(false)
        return
      }

      // DEBUG: see what UploadThing gave us
      console.log("uploadthing resp:", resp)
      // Expected shape:
      // [{
      //   url: "https://utfs.io/...",
      //   name: "file.pdf",
      //   key: "abc",
      //   serverData: { userId: "..." }
      // }]

      toast("🗒️ Processing PDF...")
      setTimeout(() => {
        toast("🤖 Our AI is reading your document...")
      }, 3000)

      // ✅ PASS THE WHOLE ARRAY (or map to only what you need)
      const slim: UploadThingResponse[] = resp.map(({ url, name, key, serverData }) => ({
        url,
        name,
        key,
        serverData,
      }))

      const result = await generatePdfSummary(slim)

      
      if (!result.success) {
        toast(`❌ ${result.message}`)
        console.warn("Summary failed:", result)
        setIsLoading(false)
        return
      }
      toast("✅ Summary generated successfully!")
      console.log("Summary generated successfully:", result.data)
      console.log("Summary result:", result.data?.summary)
      // You can render result.data.summary in your UI now


      const { data = null, message = null } = result || {}

      if(data) {
        toast("📄Saving PDF...")
        // if(data.summary) {
        //   //save the summary to the db

        // }
      }
      formRef.current?.reset()
    } catch (error) {
      console.log('Error occured', error)
      formRef.current?.reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  )
}
