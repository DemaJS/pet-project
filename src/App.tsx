// import React, {useEffect} from 'react';
// import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import AlarmIcon from '@material-ui/icons/Alarm';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
// import PersonIcon from '@material-ui/icons/Person';
// import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
// import FaceIcon from '@material-ui/icons/Face';
// import Chip from '@material-ui/core/Chip';
// import {NavLink, Route} from 'react-router-dom';
// import {Counter} from "./Components/Counter/Counter";
// import ToDo from "./Components/ToDo/ToDo";
// import {Profile} from "./Components/Profile/Profile";
// import {useDispatch, useSelector} from "react-redux";
// import {logoutThunk, setAuthThunk} from "./Reducers/Auth-reducer";
// import {AppStateType} from "./State/Store";
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import CodeIcon from '@material-ui/icons/Code';
// import {SignupForm} from "./Components/Login/Formik-login";
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Button from "@material-ui/core/Button";
// import {Users} from "./Components/Users/Users";
// import {TestComponent} from "./Components/Utils/Test-component";
//
//
//
// const drawerWidth = 240;
//
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             display: 'flex',
//         },
//         appBar: {
//             zIndex: theme.zIndex.drawer + 1,
//         },
//         drawer: {
//             width: drawerWidth,
//             flexShrink: 0,
//         },
//         drawerPaper: {
//             width: drawerWidth,
//         },
//         drawerContainer: {
//             overflow: 'auto',
//         },
//         content: {
//             flexGrow: 1,
//             padding: theme.spacing(3),
//         },
//         button: {
//             margin: theme.spacing(1),
//         }
//     }),
// );
//
// export function App() {
//
//     const dispatch = useDispatch()
//
//     // @ts-ignore
//     const login = useSelector<AppStateType, string>((state) => state.auth.login)
//
//     useEffect(() => {
//         dispatch(setAuthThunk())
//     }, [])
//
//     const classes = useStyles();
//
//     const logoutHandle = () => {
//         dispatch(logoutThunk())
//     }
//
//     return (
//
//             <div className={classes.root}>
//                 <CssBaseline/>
//                 <AppBar position="fixed" className={classes.appBar}>
//                     <Toolbar>
//
//                         {
//                             login
//                                 ?
//                                 <>
//                                     <Button
//                                         onClick={logoutHandle}
//                                         variant="outlined"
//                                         size="large"
//                                         startIcon={<ExitToAppIcon/>}>
//                                         Log Out
//                                     </Button>
//                                     <Chip label={login} color="primary" icon={<FaceIcon/>}/>
//                                 </>
//                                 :
//                                 <NavLink to={'/login'} style={{textDecoration: 'none'}}>
//                                     <Button
//                                         variant="outlined"
//                                         size="large"
//                                         startIcon={<VpnKeyIcon/>}>
//                                         Log In
//                                     </Button>
//                                 </NavLink>
//                         }
//                     </Toolbar>
//                 </AppBar>
//                 <Drawer
//                     className={classes.drawer}
//                     variant="permanent"
//                     classes={{
//                         paper: classes.drawerPaper,
//                     }}
//                 >
//                     <Toolbar/>
//                     <div className={classes.drawerContainer}>
//
//                         <Divider/>
//
//                             <List>
//
//                                 <NavLink to='/counter' style={{textDecoration: 'none'}}>
//                                     <ListItem button>
//                                         <ListItemIcon><AlarmIcon/></ListItemIcon>
//                                         <ListItemText primary='Counter'/>
//                                     </ListItem>
//                                 </NavLink>
//
//                                 <NavLink to='/users' style={{textDecoration: 'none'}}>
//                                     <ListItem button>
//                                         <ListItemIcon><GroupAddIcon/></ListItemIcon>
//                                         <ListItemText primary='Users'/>
//                                     </ListItem>
//                                 </NavLink>
//
//                                 <NavLink to='/profile' style={{textDecoration: 'none'}}>
//                                     <ListItem button>
//                                         <ListItemIcon><PersonIcon/></ListItemIcon>
//                                         <ListItemText primary='Profile'/>
//                                     </ListItem>
//                                 </NavLink>
//
//                                 <NavLink to='/todo' style={{textDecoration: 'none'}}>
//                                     <ListItem button>
//                                         <ListItemIcon><FormatListNumberedIcon/></ListItemIcon>
//                                         <ListItemText primary='ToDo List'/>
//                                     </ListItem>
//                                 </NavLink>
//
//                                 <NavLink to='/test' style={{textDecoration: 'none'}}>
//                                     <ListItem button>
//                                         <ListItemIcon><CodeIcon/></ListItemIcon>
//                                         <ListItemText primary='Test'/>
//                                     </ListItem>
//                                 </NavLink>
//
//                             </List>
//
//                     </div>
//                 </Drawer>
//
//                     <main className={classes.content}>
//                         <Toolbar/>
//                         <Route path="/counter" render={() => <Counter/>}/>
//                         <Route path="/todo" render={() => <ToDo/>}/>
//                         <Route path="/profile/:userID?" render={() => <Profile/>}/>
//                         <Route path="/users" render={() => <Users/>}/>
//                         <Route path="/login" render={() => <SignupForm/>}/>
//                         <Route path="/test" render={() => <TestComponent/>}/>
//                     </main>
//
//             </div>
//     )
// }


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
import {Counter} from "./Components/Counter/Counter";
import ToDo from "./Components/ToDo/ToDo";
import {Profile} from "./Components/Profile/Profile";
import {Users} from "./Components/Users/Users";
import {SignupForm} from "./Components/Login/Formik-login";
import {TestComponent} from "./Components/Utils/Test-component";
import {logoutThunk, setAuthThunk} from "./Reducers/Auth-reducer";
import {useDispatch,useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";


export function App() {

    const dispatch = useDispatch()

    // @ts-ignore
    const login = useSelector<AppStateType, string>((state) => state.auth.login)

    useEffect(() => {
        dispatch(setAuthThunk())
    }, [])

    const logoutHandle = () => {
        dispatch(logoutThunk())
    }

    return (
        <Grid container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{display: 'flex'}}>
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
                        <Button color="inherit">Login</Button>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Route path="/counter" render={() => <Counter/>}/>
            <Route path="/todo" render={() => <ToDo/>}/>
            <Route path="/profile/:userID?" render={() => <Profile/>}/>
            <Route path="/users" render={() => <Users/>}/>
            <Route path="/login" render={() => <SignupForm/>}/>
            <Route path="/test" render={() => <TestComponent/>}/>
        </Grid>
    );
}

