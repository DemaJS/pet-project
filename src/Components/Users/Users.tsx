import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import {Grid} from "@material-ui/core";
import {User} from "./User";


export function Users() {

    return (
        <>
            <div style={{marginBottom:'20px'}}>
                <Pagination count={10} variant="outlined" shape="rounded"/>
            </div>

            <Grid container spacing={3}>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
            </Grid>

        </>
    )
}








