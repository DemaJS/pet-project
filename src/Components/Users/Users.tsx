import React, {useEffect} from 'react'
import Pagination from '@material-ui/lab/Pagination';
import {Grid} from "@material-ui/core";
import {User} from "./User";
import {useDispatch, useSelector} from "react-redux";
import {setUsersThunk, userItemType} from "../../Reducers/Users-reducers";
import {AppStateType} from "../../State/Store";
import LinearProgress from "@material-ui/core/LinearProgress";
import {statusType} from "../../Reducers/App-reducer";


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


    return (
        <>
            {loading === 'loading' && <LinearProgress/>}
                <div style={{marginBottom: '20px'}}>
                    <Pagination count={total} variant="outlined" shape="rounded" page={currentPage}
                                onChange={handleChange}/>
                </div>

                <Grid container spacing={3}>
                    {
                        users.map(el => {
                            return <User name={el.name} status={el.status} photo={el.photos.large}/>
                        })
                    }
                </Grid>
        </>
    )
}








