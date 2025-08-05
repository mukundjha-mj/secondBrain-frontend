import React from 'react';

interface DocumentIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({ className = "w-6 h-6", style }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10M7 4v16a1 1 0 001 1h8a1 1 0 001-1V4M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h2" />
    </svg>
);
