import React, { useEffect, useRef, useState } from 'react';

interface MasonryGridProps {
  children: React.ReactNode[];
  gap?: number;
  minColumnWidth?: number;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  children, 
  gap = 24, 
  minColumnWidth = 300 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      if (gridRef.current) {
        const containerWidth = gridRef.current.offsetWidth;
        const newColumns = Math.max(1, Math.floor(containerWidth / minColumnWidth));
        setColumns(newColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    
    // Set loaded after initial render
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      window.removeEventListener('resize', updateColumns);
      clearTimeout(timer);
    };
  }, [minColumnWidth]);

  // Height-aware distribution
  const distributeItems = () => {
    const columnHeights = Array(columns).fill(0);
    const columnArrays = Array.from({ length: columns }, () => [] as React.ReactNode[]);
    
    children.forEach((child) => {
      // Find the column with minimum height
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnArrays[minHeightIndex].push(child);
      
      // Estimate height based on content type
      // This is a rough estimation - YouTube videos are typically taller
      const estimatedHeight = React.isValidElement(child) && 
        (child.props as any)?.type === 'youtube' ? 250 : 150;
      columnHeights[minHeightIndex] += estimatedHeight + gap;
    });
    
    return columnArrays;
  };

  const columnArrays = isLoaded ? distributeItems() : 
    Array.from({ length: columns }, (_, i) => 
      children.filter((_, index) => index % columns === i)
    );

  return (
    <div 
      ref={gridRef} 
      className="flex"
      style={{ gap: `${gap}px` }}
    >
      {columnArrays.map((column, columnIndex) => (
        <div 
          key={columnIndex} 
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {column}
        </div>
      ))}
    </div>
  );
};
