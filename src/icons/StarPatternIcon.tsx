interface IconProps {
    className?: string;
    size?: number;
}

export const StarPatternIcon = ({ className = "w-full h-full", size }: IconProps) => {
    return (
        <svg 
            className={className} 
            width={size || "100"} 
            height={size || "100"} 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fillOpacity="0.05">
                <polygon 
                    fill="#ffffff" 
                    points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"
                />
            </g>
        </svg>
    );
};
