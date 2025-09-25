'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { NavigationControls } from './navigation-controls';
import ProgressBar from './progress-bar';
import { parseSection } from '@/lib/summary-helper';
import ContentSection from './content-section';

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-1 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <h2
        className="text-xl lg:text-3xl font-bold tracking-tight
        text-center flex items-center justify-center"
      >
        {title}
      </h2>
    </div>
  );
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split('\n#')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card
      className="relative px-2 w-full xl:w-[600px] 
      bg-gradient-to-br from-background via-background/95 to-rose-500/5 
      backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10"
    >
      {/* Progress Bar */}
      <ProgressBar sections={sections} currentSection={currentSection} />

      {/* Scrollable Content */}
      <div className=" sm:pt-16 pb-1 sm:pb-24">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ''} />
          <ContentSection
            title={sections[currentSection]?.title || ''}
            points={sections[currentSection]?.points || []}
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}
