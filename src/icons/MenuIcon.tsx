import React from 'react';

interface MenuIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const MenuIcon: React.FC<MenuIconProps> = ({ className = "w-5 h-5", style }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
