import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import {Display} from "./Display";
import {DisplayWithInput} from "./DisplayWithInput";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";



export function Counter() {

    const [number, setNumber] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    // @ts-ignore
    const login = useSelector<AppStateType, string>((state) => state.auth.login)

    if(!login) {
        return <Redirect to="/login" />
    }

    return (
        <Grid container spacing={3} style={{margin:'20px'}}>
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