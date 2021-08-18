import React, {useEffect} from 'react'
import Pagination from '@material-ui/lab/Pagination';
import Card from "@material-ui/core/Card";
import {User} from "./User";
import {useDispatch, useSelector} from "react-redux";
import {setUsersThunk, userItemType} from "../../Reducers/Users-reducers";
import {AppStateType} from "../../State/Store";
import LinearProgress from "@material-ui/core/LinearProgress";
import {statusType} from "../../Reducers/App-reducer";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router-dom";


export function Users() {

    const dispatch = useDispatch()
    const users = useSelector<AppStateType, Array<userItemType>>((state) => state.users.users)
    const pageSize = useSelector<AppStateType, number>((state) => state.users.pageSize)
    const currentPage = useSelector<AppStateType, number>((state) => state.users.currentPage)
    const total = useSelector<AppStateType, number>((state) => state.users.total)
    const loading = useSelector<AppStateType, statusType>(state => state.app.status)

    useEffect(() => {
        dispatch(setUsersThunk(pageSize, currentPage))
    }, [])


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setUsersThunk(pageSize, value))
    };

    // @ts-ignore
    const login = useSelector<AppStateType, string>((state) => state.auth.login)

    if(!login) {
        return <Redirect to="/login" />
    }

    return (
        <Grid item xs={12}>
            {loading === 'loading' && <LinearProgress/>}

                <Pagination count={total} variant="outlined" shape="rounded" page={currentPage}
                            onChange={handleChange} style={{padding: '10px'}}/>

                <Card elevation={2} style={{margin: '10px'}}>
                    {
                        users.map(el => {
                            return <User name={el.name} status={el.status} photo={el.photos.large} id={el.id}/>
                        })
                    }
                </Card>
        </Grid>
    )
}








