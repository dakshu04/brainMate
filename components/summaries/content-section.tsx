import React from "react";

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point); // e.g., "1. Something"
  const isMainPoint = /^[*-]/.test(point); // e.g., "* Something" or "- Something"

  // Simplified emoji detection regex
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);

  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

// Extract emoji (if any) and remaining text
function parseEmojiPoint(point: string) {
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}])/u;
  const match = point.match(emojiRegex);

  if (match) {
    return {
      emoji: match[0],
      text: point.replace(match[0], "").trim(),
    };
  }

  return {
    emoji: "",
    text: point.trim(),
  };
}

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point);

  return (
    <div
      className="group relative bg-gradient-to-br
      from-gray-200/[0.08] to-gray-400/[0.03]
      p-4 rounded-2xl border border-gray-500/10
      hover:shadow-lg transition-all"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r
        from-gray-500/10 to-transparent opacity-0
        group-hover:opacity-100 transition-opacity rounded-2xl"
      />
      <div className="relative flex items-start gap-3">
        {emoji && <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>}
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div
      className="group relative bg-gradient-to-br
          from-gray-200/[0.08] to-gray-400/[0.03]
          p-4 rounded-2xl border border-gray-500/10
          hover:shadow-lg transition-all"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r
            from-gray-500/10 to-transparent opacity-0
            group-hover:opacity-100 transition-opacity rounded-2xl"
      />
      <p
        className="relative text-lg lg:text-xl 
                text-muted-foreground/90 leading-relaxed text-left"
      >
        {point}
      </p>
    </div>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
      )}
      {points.map((point, index) => {
        const { hasEmoji, isMainPoint, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} point={point} />;
        }

        return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </div>
  );
}
