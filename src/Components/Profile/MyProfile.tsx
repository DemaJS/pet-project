import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {Description} from "./Description";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {setProfileThunk} from "../../Reducers/Profile-reducer";
import ava from './../../Images/atom.png'
import {Contacts} from "./Contacts";
import Grid from "@material-ui/core/Grid";
import {NavLink} from 'react-router-dom';


type propsType = {
    id: string
}

export function MyProfile(props: propsType) {

    // @ts-ignore
    const meID = useSelector<AppStateType, number>((state) => state.auth.id)

    const dispatch = useDispatch()

    useEffect(() => {
        props.id ? dispatch(setProfileThunk(+props.id)) : dispatch(setProfileThunk(meID))
    }, [props.id, meID])

    const userName = useSelector<AppStateType, string>((state) => state.profile.profile.fullName)
    /*    const userAvatar = useSelector<AppStateType,string>((state) => state.profile.profile.photos.large)*/


    return (

        <Grid container>

            <Grid item xs={12}>

                <Card elevation={2}>
                    <CardHeader
                        avatar={
                                <Avatar aria-label="recipe" style={{height: '100px', width: '100px'}}
                                        src={ava}>
                                </Avatar>
                        }
                        title={userName}
                        subheader='Front-end developer'
                    />
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card style={{marginTop: '20px'}} elevation={2}>
                    <CardHeader title='Description:'/>
                    <CardContent>
                        <Description/>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card style={{marginTop: '20px'}} elevation={2}>
                    <CardHeader title='Contacts:'/>
                    <CardContent>
                        <Contacts/>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>

    )
        ;
}