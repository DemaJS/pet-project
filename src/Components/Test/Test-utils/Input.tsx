import React from "react";

type Props = React.HTMLProps<HTMLInputElement>

export const Input:React.FC<Props> = ({children, ...props}) => {

    return (
        <input {...props}/>
    )
}