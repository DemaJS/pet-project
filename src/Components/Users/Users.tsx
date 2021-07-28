import React, {useEffect} from 'react'
import Pagination from '@material-ui/lab/Pagination';
import {Grid} from "@material-ui/core";
import {User} from "./User";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addUsersAC, userItemType} from "../../Reducers/Users-reducers";
import {AppStateType} from "../../State/Store";


export function Users() {

    const dispatch = useDispatch()
    const users = useSelector<AppStateType,Array<userItemType>>((state) => state.users.users )

    useEffect(() => {
        axios.get(' https://social-network.samuraijs.com/api/1.0/users').then(response => {
            dispatch(addUsersAC(response.data.items))
        })
    },[])

    return (
        <>
            <div style={{marginBottom:'20px'}}>
                <Pagination count={10} variant="outlined" shape="rounded"/>
            </div>

            <Grid container spacing={3}>
                {
                    users.map(el => {
                        return  <User name = {el.name} status = {el.status}/>
                    })
                }
            </Grid>
        </>
    )
}








