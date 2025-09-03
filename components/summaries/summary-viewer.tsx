'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const parseSection = (section: string) => {
  const [title, ...content] = section.split('\n');
  
  const cleanTitle = title.startsWith('#') ? title.substring(1).trim() : title.trim()

    const points: String[] = []

    let currentPoint = ''

    content.forEach((line) => {
        const trimmedLine = line.trim()
        if(trimmedLine.startsWith('-')){
            if(currentPoint) points.push(currentPoint.trim())
                currentPoint = trimmedLine
        }  else if(!trimmedLine) {
            if(currentPoint) {
                points.push(currentPoint.trim())
                currentPoint = ''
            } else {
                currentPoint += ' ' + trimmedLine
            }
        }  
    })
    if(currentPoint) points.push(currentPoint.trim())
  return { title: cleanTitle,
            points: points.filter(
                (point) => point && !point.startsWith('#') && !point.startsWith('[Choose') 
            ) };
};

export function SummaryViewer({ summary }: { summary: string }) {
    const [currentSection, setCurrentSection] = useState(0)


  //parseSummary
  const sections = summary
    .split('\n#')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sections[currentSection].title}</CardTitle>
      </CardHeader>
      <CardContent>{JSON.stringify(sections[currentSection].points)}</CardContent>
    </Card>
  );
}