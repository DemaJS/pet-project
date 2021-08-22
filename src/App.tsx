import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {NavLink, Route} from 'react-router-dom';
import AlarmIcon from '@material-ui/icons/Alarm';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SettingsIcon from '@material-ui/icons/Settings';
import {Counter} from "./Components/Counter/Counter";
import {Profile} from "./Components/Profile/Profile";
import {Users} from "./Components/Users/Users";
import {SignupForm} from "./Components/Login/Formik-login";
import {logoutThunk, setAuthThunk} from "./Reducers/Auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {Settings} from "./Components/Settings/Settings";
import {AppStateType} from "./State/Store";
import {ToDo} from "./Components/ToDo/ToDo";


export function App() {

    const dispatch = useDispatch()
    const login = useSelector<AppStateType, string | null>((state) => state.auth.login)

    useEffect(() => {
        dispatch(setAuthThunk())
    }, [])

    const logoutHandle = () => {
        dispatch(logoutThunk())
    }

    return (
        <Grid container style={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        <NavLink to='/counter' style={{textDecoration: 'none'}}>
                            <IconButton><AlarmIcon/></IconButton>
                        </NavLink>
                        <NavLink to='/users' style={{textDecoration: 'none'}}>
                            <IconButton><GroupAddIcon/></IconButton>
                        </NavLink>
                        <NavLink to='/profile' style={{textDecoration: 'none'}}>
                            <IconButton><PersonIcon/></IconButton>
                        </NavLink>
                        <NavLink to='/todo' style={{textDecoration: 'none'}}>
                            <IconButton><FormatListNumberedIcon/></IconButton>
                        </NavLink>
                        <NavLink to='/settings' style={{textDecoration: 'none'}}>
                            <IconButton><SettingsIcon/></IconButton>
                        </NavLink>

                    </Typography>
                    {
                        login
                            ?
                            <>
                                <Button
                                    onClick={logoutHandle}
                                    variant="outlined"
                                    size="small"
                                    startIcon={<ExitToAppIcon/>}>
                                    Log Out
                                </Button>
                            </>
                            :
                            <NavLink to={'/login'} style={{textDecoration: 'none'}}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<VpnKeyIcon/>}>
                                    Log In
                                </Button>
                            </NavLink>
                    }
                </Toolbar>
            </AppBar>
            <Route path="/counter" render={() => <Counter/>}/>
            <Route path="/todo" render={() => <ToDo/>}/>
            <Route path="/profile/:userID?" render={() => <Profile/>}/>
            <Route path="/users" render={() => <Users/>}/>
            <Route path="/login" render={() => <SignupForm/>}/>
            <Route path="/settings" render={() => <Settings/>}/>
        </Grid>
    );
}

