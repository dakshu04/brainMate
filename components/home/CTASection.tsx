import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Save Hours of Reading Time?
        </h2>
        <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
          Transform lengthy documents into clear, actionable insights with our
          AI-powered summarizer.
        </p>
      </div>

      <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-8">
        <Button
          size="lg"
          variant="link"
          className="w-full min-[400px]:w-auto bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300"
        >
          <Link
            href="/pricing"
            className="flex items-center justify-center"
          >
            Get Started{" "}
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
