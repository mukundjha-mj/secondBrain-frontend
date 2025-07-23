import type { ReactElement } from "react";


type Variant = "primary" | "secondary";
interface ButtonProps{
    variant: Variant;
    size: "sm" | "md" | "lg";
    className: string;
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=> void;
}

const variantStyle = {
    "primary" : "bg-[#5046e4] text-white",
    "secondary" : "bg-[#e0e7fe] text-[#5046e4]"
}

const defaultStyle = "rounded-md p-4 flex";
const sizeStyle = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

export const Button  = (props: ButtonProps)=>{
    return(
        <button
            className={`${defaultStyle} ${variantStyle[props.variant]} ${sizeStyle[props.size]}`}
            onClick={props.onClick}
        >
            {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
            {props.text}
            {props.endIcon}
        </button>
    )
}

