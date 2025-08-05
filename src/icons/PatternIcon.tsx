interface IconProps {
    className?: string;
    size?: number;
}

export const PatternIcon = ({ className = "w-full h-full", size }: IconProps) => {
    return (
        <svg 
            className={className} 
            width={size || "60"} 
            height={size || "60"} 
            viewBox="0 0 60 60" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none" fillRule="evenodd">
                <g fill="#9C92AC" fillOpacity="0.05">
                    <path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
                </g>
            </g>
        </svg>
    );
};
