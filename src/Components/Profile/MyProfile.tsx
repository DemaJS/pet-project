import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../State/Store";
import {profileType, setProfileThunk} from "../../Reducers/Profile-reducer";
import ava from './../../Images/atom.png'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HttpIcon from '@material-ui/icons/Http';
import FacebookIcon from '@material-ui/icons/Facebook';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

type propsType = {
    id: string
}

export function MyProfile(props: propsType) {

    const meID = useSelector<AppStateType, number>((state) => state.auth.id!)
    const dispatch = useDispatch()

    useEffect(() => {
        props.id ? dispatch(setProfileThunk(+props.id)) : dispatch(setProfileThunk(meID))
    }, [props.id, meID])

    const userName = useSelector<AppStateType, string>((state) => state.profile.profile.fullName)
    const userProfile = useSelector<AppStateType, profileType>((state) => state.profile.profile)

    return (

        <Grid container spacing={2}>

            <Grid item xs={12}>
                <Card elevation={2} style={{borderRadius: '20px', backgroundColor: '#f3f2ef'}}>
                    <CardHeader
                        avatar={
                            <Avatar
                                style={{height: '100px', width: '100px'}}
                                aria-label="recipe"
                                src={userProfile
                                    ? userProfile.photos?.large
                                    : ava}/>
                        }
                        title={userName}
                        subheader={userProfile.aboutMe}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Имею опыт создания веб-приложений со стеком React-Redux-TypeScript.
                            Открыт для ваших предложений.
                            <IconButton aria-label="settings">
                                <CreateIcon/>
                            </IconButton>
                        </Typography>
                        <Typography>
                            <div style={{display: 'flex'}}>
                                <WorkOutlineIcon/>
                                &nbsp;
                                &nbsp;
                                <span>Open to work :</span>
                                &nbsp;
                                <span>{userProfile.lookingForAJob ? <DoneIcon/> : <ClearIcon/>}</span>
                            </div>
                        </Typography>
                        <div style={{display: 'flex'}}>
                            <span><PlaylistAddCheckIcon/></span>
                            &nbsp;
                            &nbsp;
                            <Typography>
                                Skills: {userProfile.lookingForAJobDescription}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card elevation={2} style={{borderRadius: '20px', backgroundColor: '#f3f2ef'}}>
                    <CardHeader title='Contacts'/>
                    <List>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <GitHubIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary=
                                    {userProfile.contacts?.github
                                        ? <a href={userProfile.contacts.github}>www.github.com</a>
                                        : "GitHub"}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <LinkedInIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary=
                                    {userProfile.contacts?.github
                                        ?
                                        <a href={'https://www.linkedin.com/in/victor-demin-react/'}>www.linkedin.com</a>
                                        : "LinkedIn"}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <HttpIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={userProfile.contacts?.github
                                    ? <a href={userProfile.contacts.website}>www.website.com</a>
                                    : "WebSite"}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <FacebookIcon/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={userProfile.contacts?.github
                                    ? <a href={'https://ru-ru.facebook.com/'}>www.facebook.com</a>
                                    : "Facebook"}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </List>
                </Card>
            </Grid>

        </Grid>

    )
}
