export const parseSection = (section: string) => {
  const [title, ...content] = section.split('\n');
  const cleanTitle = title.startsWith('#') ? title.substring(1).trim() : title.trim();
  

  const points: string[] = [];
  let currentPoint = '';

  content.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmed.replace('-', '').trim();
    } else if (trimmed) {
      currentPoint += ' ' + trimmed;
    }
  });
  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (p) => p && !p.startsWith('#') && !p.startsWith('[Choose')
    ),
  };
};