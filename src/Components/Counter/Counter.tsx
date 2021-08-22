import React from 'react';
import {Grid} from "@material-ui/core";
import {Display} from "./Display";
import {DisplayWithInput} from "./DisplayWithInput";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../State/Store";



export function Counter() {


    const login = useSelector<AppStateType, string | null>((state) => state.auth.login)

    if(!login) {
        return <Redirect to="/login" />
    }

    return (
        <Grid container spacing={3} justify="center" style={{margin:'20px'}}>
            <Grid item>
                <Display/>
            </Grid>
            <Grid item>
                <DisplayWithInput/>
            </Grid>
        </Grid>
    );
}