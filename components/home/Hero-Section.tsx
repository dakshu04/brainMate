import { ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col items-center justify-center py-20 lg:py-28 max-w-6xl px-6">
      {/* Badge */}
      <div className="mb-6">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-300 via-rose-500 to-rose-700 animate-gradient-x group">
          <Badge className="bg-white/80 text-rose-700 font-medium px-4 py-1 rounded-full flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-rose-600" />
            Powered by AI
          </Badge>
        </div>
      </div>

      {/* Headings */}
      <h1 className="font-bold text-center text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-gray-900">
        Transform PDFs into <span className="text-rose-600">Concise Summaries</span>
      </h1>

      <p className="mt-4 sm:mt-6 text-center text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
        Get a clean and beautiful summary reel of your documents in seconds.
      </p>

      {/* Button */}
      <div className="mt-8 sm:mt-12">
        <Link href="/#pricing">
          <Button
            variant="link"
            className="flex items-center gap-2 text-white text-base sm:text-lg font-semibold rounded-full px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-slate-900 to-rose-600 hover:from-rose-600 hover:to-slate-900 hover:no-underline shadow-lg transition-all duration-300"
          >
            <span>Try BrainMate</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
