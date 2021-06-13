import React from 'react'
import {Grid} from "@material-ui/core";
import {MyProfile} from "./MyProfile";
import {Posts} from "./Posts";

export function Profile() {

    return (
        <Grid container spacing={5}>
            <Grid item >
                <MyProfile/>
            </Grid>
            <Grid item >
                <Posts/>
            </Grid>
        </Grid>
    )
}