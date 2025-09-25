import { Button } from '@/components/ui/button';
import { Calendar, Clock, Sparkles, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      
      {/* Left: Info + Title */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full text-rose-600 font-medium shadow-sm">
            <Sparkles className="h-4 w-4 text-rose-500" />
            AI Summary
          </span>

          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="h-4 w-4 text-rose-400" />
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4 text-rose-400" />
            {readingTime} min read
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      {/* Right: Back Button */}
      <Link href="/dashboard">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 rounded-full"
        >
          <ChevronLeft className="h-4 w-4 text-rose-500" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
