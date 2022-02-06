import React from 'react'
import Grid from "@material-ui/core/Grid";
import {MyProfile} from "./MyProfile";
import {Posts} from "./Posts";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";


type paramsType = {
    userID: string
}

export function Profile() {

    const {userID} = useParams<paramsType>()

    return (
        <Grid container spacing={5} style={{margin: '20px'}}>
            <Grid xs={12} lg={6} item>
                <MyProfile id={userID}/>
            </Grid>
            <Grid xs={12} lg={6} item>
                <Posts/>
            </Grid>
        </Grid>
    )
}