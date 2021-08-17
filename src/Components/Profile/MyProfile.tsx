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
        <>
            <Card elevation={2} >
                <CardHeader
                    style={{backgroundColor:'#dce6f1'}}
                    avatar={
                        <Avatar aria-label="recipe" style={{height: '100px', width: '100px'}}
                                src={ava}>
                        </Avatar>
                    }
                    title={userName}
                    subheader='Front-end developer'
                />
            </Card>

            <Card style={{marginTop: '20px',backgroundColor:'#dce6f1'}} elevation={2}>
                <CardHeader title='Description:'/>
                <CardContent>
                    <Description/>
                </CardContent>
            </Card>

            <Card style={{marginTop: '20px', backgroundColor:'#dce6f1'}} elevation={2}>
                <CardHeader title='Contacts:'/>
                <CardContent>
                    <Contacts/>
                </CardContent>
            </Card>
        </>
    );
}