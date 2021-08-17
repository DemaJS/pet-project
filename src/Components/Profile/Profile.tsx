import React from 'react'
import {Grid} from "@material-ui/core";
import {MyProfile} from "./MyProfile";
import {Posts} from "./Posts";
import { useParams } from 'react-router-dom';


export function Profile() {

    // @ts-ignore
    const { userID } = useParams()

console.log(userID)

    // @ts-ignore
    return (
        <Grid container spacing={5}>
            <Grid xs={7} item >
                <MyProfile id = {userID}/>
            </Grid>
            <Grid xs={5} item >
                <Posts/>
            </Grid>
        </Grid>
    )
}