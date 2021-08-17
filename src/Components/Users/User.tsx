import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ava from './../../Images/atom.png'
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { NavLink } from 'react-router-dom';


type propsType = {
    name: string
    status: string
    photo: string
    id: number
}


export function User(props: propsType) {

    return (
        <List key={props.id}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <NavLink to={'profile/' + props.id}>
                        <Avatar alt="Remy Sharp"
                                src={props.photo ? props.photo : ava}
                                style={{width: '50px', height: '50px'}}
                        />
                    </NavLink>
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                Status:
                            </Typography>
                            {props.status}
                        </React.Fragment>
                    }
                />
                <IconButton>
                    <PersonAddDisabledIcon/>
                </IconButton>
                <IconButton>
                    <PersonAddIcon/>
                </IconButton>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </List>
    )
}
