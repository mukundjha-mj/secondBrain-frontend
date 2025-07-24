import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
}

const variantStyle = {
    "primary": "bg-[var(--purple-600)] text-white ",
    "secondary": "bg-[var(--purple-200)] text-purple-600"
}

const defaultStyle = "px-4 py-2 rounded-md flex items-center cursor-pointer font-normal"

export const Button = (props: ButtonProps) => {
    return (
        <button className={`${variantStyle[props.variant]} ${defaultStyle} `}>
            <div className="pr-2">
                {props.startIcon}
            </div>
            {props.text}
        </button >
    )
}