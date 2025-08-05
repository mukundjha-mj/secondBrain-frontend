interface IconProps {
    className?: string;
    size?: number;
    style?: React.CSSProperties;
}

export const SearchIcon = ({ className = "w-6 h-6", size, style }: IconProps) => {
    return (
        <svg 
            className={className} 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={style}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
        </svg>
    );
};
