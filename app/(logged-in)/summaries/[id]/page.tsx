import BgGradient from '@/components/common/bg-gradient';
import { SourceInfo } from '@/components/summaries/source-info';
import { SummaryViewer } from '@/components/summaries/summary-viewer';
import { SummaryHeader } from '@/components/summaries/summay-header';
import { getSummaryById } from '@/lib/summaries';
import { FileText } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at, originalFileUrl } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative max-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      {/* Soft background gradient */}
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200 opacity-30 blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-14 lg:py-20 flex flex-col gap-5">
        
        {/* Page Header */}
        <SummaryHeader title={title} createdAt={created_at} readingTime={readingTime} />

        {/* Source Info */}
        {file_name && (
          <SourceInfo
            title={title}
            summaryText={summary_text}
            fileName={file_name}
            createdAt={created_at}
            originalFileUrl={originalFileUrl}
          />
        )}

        {/* Summary Viewer */}
        <div className="relative max-w-4xl mx-auto w-full">
          <div className="relative bg-white/80 backdrop-blur-lg border border-rose-100/50 rounded-2xl shadow-md hover:shadow-xl transition-all p-2 sm:p-8">
            
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 via-orange-50 to-transparent opacity-50 rounded-xl pointer-events-none" />

            {/* Word count badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 text-sm bg-white/90 text-rose-600 px-3 py-1.5 rounded-full shadow-sm">
              <FileText className="h-4 w-4 text-rose-400" />
              {word_count?.toLocaleString()} words
            </div>

            {/* Summary Content */}
            <div className="relative mt-6">
              <SummaryViewer summary={summary_text} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
