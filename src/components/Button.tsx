import type { ReactElement, ReactNode } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "ghost";
    text?: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    children?: ReactNode;
}

const variantStyle = {
    "primary": "text-white transition-all duration-200 hover:scale-105",
    "secondary": "border-2 transition-all duration-200 hover:scale-105",
    "ghost": "transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white"
}

const sizeStyle = {
    "sm": "px-3 py-2 text-sm",
    "md": "px-4 py-2.5 text-sm", 
    "lg": "px-6 py-3 text-base"
}

const defaultStyle = "rounded-lg flex items-center justify-center cursor-pointer font-semibold"

export const Button = (props: ButtonProps) => {
    const { variant, text, startIcon, onClick, fullwidth = false, loading = false, className = "", size = "md", disabled = false, children } = props;
    
    const primaryStyle = {
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
        boxShadow: '0 4px 14px 0 rgba(30, 157, 241, 0.39)'
    };

    const secondaryStyle = {
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
        backgroundColor: 'transparent'
    };

    const ghostStyle = {
        backgroundColor: 'var(--muted)',
        color: 'var(--muted-foreground)'
    };

    const getVariantStyle = () => {
        switch (variant) {
            case "primary": return primaryStyle;
            case "secondary": return secondaryStyle;
            case "ghost": return ghostStyle;
            default: return primaryStyle;
        }
    };

    return (
        <button 
            className={`${variantStyle[variant]} ${defaultStyle} ${sizeStyle[size]} ${fullwidth ? "w-full" : ""} ${loading ? "opacity-50" : ""} ${className}`} 
            style={getVariantStyle()}
            onClick={onClick} 
            disabled={loading || disabled}
        >
            {startIcon && (
                <div className={text ? "pr-1.5" : ""}>
                    {startIcon}
                </div>
            )}
            {text}
            {children}
        </button>
    )
}