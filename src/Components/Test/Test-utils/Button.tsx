import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button:React.FC<Props> = ({children, ...props}) => {

    return (
        <button {...props}>{children}</button>
    )
}