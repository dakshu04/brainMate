import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function UploadHeaderPage() {
  return (
    <div className="max-w-xl w-full text-center space-y-6 mx-auto">
      {/* Badge */}
      <Badge
        variant="secondary"
        className="mx-auto w-fit px-4 py-2 text-sm font-medium border border-rose-200 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition"
      >
        <Sparkles className="h-4 w-4 text-rose-600 animate-pulse" />
        <span className="text-rose-600">AI-Powered Content Creation</span>
      </Badge>

      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
        Start Uploading{" "}
        <span className="bg-yellow-200 px-2 rounded">Your PDF's</span>
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 text-lg">
        Upload your PDF and let our AI do the{" "}
        <span className="text-rose-600 font-semibold">magic!</span> ✨
      </p>

      {/* Upload Form */}
      <div className="mt-8 space-y-3">
       
        
      </div>
    </div>
  )
}
