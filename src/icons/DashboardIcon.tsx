import React from 'react';

interface DashboardIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({ className = "w-4 h-4", style }) => {
    return (
        <svg 
            className={className}
            style={style}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" 
            />
        </svg>
    );
};
