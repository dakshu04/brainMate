import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const CardHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => (
  <div className="flex items-start gap-3">
    <FileText className="w-6 h-6 text-rose-400 mt-1" />
    <div className="flex-1 min-w-0">
      <h3 className="text-base font-semibold text-gray-900 truncate">
        {title || formatFileName(fileUrl)}
      </h3>
      <p className="text-xs text-gray-500">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "px-3 py-1 text-xs font-medium rounded-full capitalize",
      status === "completed"
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
    )}
  >
    {status}
  </span>
);

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <Card className="relative hover:shadow-lg transition-all border border-rose-100/40">
      <div className="absolute top-3 right-3">
        <DeleteButton summaryId={summary.id} />
      </div>

      <Link href={`summaries/${summary.id}`} className="block p-5 space-y-3">
        <CardHeader
          fileUrl={summary.original_file_url}
          title={summary.title}
          createdAt={summary.created_at}
        />

        <p className="text-gray-600 line-clamp-2 text-sm sm:text-base">
          {summary.summary_text}
        </p>

        <div className="flex justify-between items-center">
          <StatusBadge status={summary.status} />
        </div>
      </Link>
    </Card>
  );
}
