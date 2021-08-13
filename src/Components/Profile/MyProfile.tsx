import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {Description} from "./Description";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {setProfileThunk} from "../../Reducers/Profile-reducer";


export function MyProfile() {

    // @ts-ignore
    const meID = useSelector<AppStateType,number>((state) => state.auth.id)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setProfileThunk(meID))
    })

    return (
        <Card  elevation={2}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" style={{height:'100px',width:'100px'}}>
                        VD
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardContent>
                <Description/>
            </CardContent>
        </Card>
    );
}