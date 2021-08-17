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
        <Grid container spacing={5} style={{margin:'20px'}}>
            <Grid xs={12} lg={6}  item >
                <MyProfile id = {userID}/>
            </Grid>
            <Grid xs={12} lg={6} item >
                <Posts/>
            </Grid>
        </Grid>
    )
}