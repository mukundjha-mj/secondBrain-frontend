import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MasonryLayoutProps {
  children: React.ReactElement[];
  gap?: number;
  columnWidth?: number;
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({ 
  children, 
  gap = 24, 
  columnWidth = 320 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemPositions, setItemPositions] = useState<Array<{top: number, left: number, width: number}>>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const columns = Math.max(1, Math.floor((containerWidth + gap) / (columnWidth + gap)));
    const actualColumnWidth = (containerWidth - (columns - 1) * gap) / columns;
    
    const columnHeights = new Array(columns).fill(0);
    const positions: Array<{top: number, left: number, width: number}> = [];

    // Get all item elements
    const items = containerRef.current.querySelectorAll('[data-masonry-item]');
    
    children.forEach((_, index) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      const left = shortestColumnIndex * (actualColumnWidth + gap);
      const top = columnHeights[shortestColumnIndex];
      
      positions.push({
        top,
        left,
        width: actualColumnWidth
      });

      // Get real height from DOM element, fallback to estimated height
      const element = items[index] as HTMLElement;
      let realHeight = 250; // Default fallback
      
      if (element && element.offsetHeight > 0) {
        realHeight = element.offsetHeight;
      }
      
      columnHeights[shortestColumnIndex] += realHeight + gap;
    });

    setItemPositions(positions);
    setContainerHeight(Math.max(...columnHeights));
  }, [children, gap, columnWidth]);

  useEffect(() => {
    setMounted(true);
    
    // Initial calculation
    const timer = setTimeout(calculateLayout, 100);
    
    // Recalculate after a delay to get real heights
    const timer2 = setTimeout(calculateLayout, 500);
    
    // Handle window resize
    const handleResize = () => {
      calculateLayout();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateLayout]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      {children.map((child, index) => (
        <div
          key={child.key || index}
          data-masonry-item
          className="absolute transition-all duration-500 ease-out hover:scale-105 hover:z-10"
          style={{
            top: itemPositions[index]?.top || 0,
            left: itemPositions[index]?.left || 0,
            width: itemPositions[index]?.width || columnWidth,
            opacity: mounted && itemPositions[index] ? 1 : 0,
            transform: mounted && itemPositions[index] 
              ? 'translateY(0) scale(1)' 
              : 'translateY(20px) scale(0.95)',
            transitionDelay: mounted ? `${index * 50}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
