import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-fit animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start flex-1 mr-3">
          <div className="w-4 h-4 bg-gray-300 rounded-full mr-2 mt-1 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Content skeleton - random height for variety */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-4/6"></div>
        
        {/* Media placeholder */}
        <div className="w-full h-32 bg-gray-300 rounded-lg mt-4"></div>
        
        {/* Bottom actions skeleton */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export const CardSkeletonVariant: React.FC<{ variant?: 'short' | 'medium' | 'tall' }> = ({ 
  variant = 'medium' 
}) => {
  const getHeight = () => {
    switch (variant) {
      case 'short': return 'h-24';
      case 'tall': return 'h-48';
      default: return 'h-32';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-fit animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start flex-1 mr-3">
          <div className="w-4 h-4 bg-gray-300 rounded-full mr-2 mt-1 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

      {/* Variable content skeleton */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        {variant !== 'short' && <div className="h-3 bg-gray-300 rounded w-4/6"></div>}
        
        {/* Media placeholder with variable height */}
        <div className={`w-full ${getHeight()} bg-gray-300 rounded-lg mt-4`}></div>
        
        {/* Bottom actions skeleton */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};
