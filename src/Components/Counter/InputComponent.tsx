import React, {ChangeEvent} from 'react'
import {TextField} from "@material-ui/core";

type propsType = {
    setMaxValue:(maxValue:number)=>void
    setStartValue:(startValue:number)=>void
    maxValue:number
    startValue:number
}

export function InputComponent(props:propsType) {

    const onChangeMaxValue = (e:ChangeEvent<HTMLInputElement>) => {
        props.setMaxValue(parseFloat(e.currentTarget.value) )
    }
    const onChangeStartValue = (e:ChangeEvent<HTMLInputElement>) => {
        props.setStartValue(parseFloat(e.currentTarget.value) )
    }

    return (
        <>
            <TextField
                id="outlined-number"
                label="Max value"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={onChangeMaxValue}
                value={props.maxValue}
            />
            <TextField
                style={{marginTop: '10px'}}
                id="outlined-number"
                label="Start value"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={onChangeStartValue}
                value={props.startValue}
            />
        </>
    )
}