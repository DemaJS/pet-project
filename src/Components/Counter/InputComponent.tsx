import React, {ChangeEvent} from 'react'
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {setMaxValueAC, setStartValueAC} from "../../Reducers/Counter-reducer";

/*type propsType = {
    setMaxValue:(maxValue:number)=>void
    setStartValue:(startValue:number)=>void
    maxValue:number
    startValue:number
}*/

export function InputComponent() {

    const startValue = useSelector<AppStateType,number>((state => state.counter.startValue))
    const maxValue = useSelector<AppStateType,number>((state => state.counter.maxValue))
    const dispatch = useDispatch()

    const onChangeMaxValue = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxValueAC(parseFloat(e.currentTarget.value)))
       /* props.setMaxValue(parseFloat(e.currentTarget.value) )*/
    }
    const onChangeStartValue = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(setStartValueAC(parseFloat(e.currentTarget.value)))
       /* props.setStartValue(parseFloat(e.currentTarget.value) )*/
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
                /*value={props.maxValue}*/
                value={maxValue}
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
                /*value={props.startValue}*/
                value={startValue}
            />
        </>
    )
}