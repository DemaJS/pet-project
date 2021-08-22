import React, {ChangeEvent} from 'react'
import {TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {setMaxValueAC, setStartValueAC} from "../../Reducers/Counter-reducer";


export function InputComponent() {

    const startValue = useSelector<AppStateType, number>((state => state.counter.startValue))
    const maxValue = useSelector<AppStateType, number>((state => state.counter.maxValue))
    const dispatch = useDispatch()

    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxValueAC(parseFloat(e.currentTarget.value)))
    }
    const onChangeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setStartValueAC(parseFloat(e.currentTarget.value)))
    }

    return (
        <>
            <div style={{display:'flex', flexDirection:'column'}}>
                <TextField
                    id="outlined-number"
                    label="Max value"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={onChangeMaxValue}
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
                    value={startValue}
                />
            </div>
        </>
    )
}