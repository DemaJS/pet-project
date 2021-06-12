import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import {Display} from "./Display";
import {DisplayWithInput} from "./DisplayWithInput";



export function Counter() {

    const [number, setNumber] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    return (
        <Grid container spacing={3}>
            <Grid item >
                <Display number = {number} setNumber = {setNumber}
                         maxValue={maxValue} setMaxValue={setMaxValue}/>
            </Grid>
            <Grid item>
                <DisplayWithInput setNumber={setNumber} setMaxValue={setMaxValue}/>
            </Grid>
        </Grid>
    );
}