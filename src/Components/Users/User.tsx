import React from 'react'
import {Card, Grid} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ava from './../../Images/atom.png'


type propsType = {
    name:string
    status:string
    photo:string
}


export function User(props:propsType) {

            return (
                <Grid item>
                    <Card >
                        <CardHeader
                            avatar={<img src={props.photo ? props.photo : ava} style={{height:'100px',width:'100px'}}/>}
                            title={props.name}
                            subheader={props.status ? props.status : 'Status'}                         />
                        <CardActions disableSpacing>
                            <IconButton>
                                <PersonAddDisabledIcon/>
                            </IconButton>
                            <IconButton>
                                <PersonAddIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            )
}