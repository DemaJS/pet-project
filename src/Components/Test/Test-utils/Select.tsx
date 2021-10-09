import React from "react";

type Props = {
    defaultOption:string
    options:Array<{ value:string, name:string }>
    value:string
    onChange:(val:string) => void

}
export const Select = ({defaultOption, options, value, onChange}:Props) => {

    return (
        <select value={value} onChange={(event => onChange(event.currentTarget.value))}>
            <option disabled>{defaultOption}</option>
            {
                options.map(el => {
                    return (
                        <option value={el.value}>{el.name}</option>
                    )
                })
            }
        </select>
    )
}