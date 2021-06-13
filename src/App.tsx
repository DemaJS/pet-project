import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AlarmIcon from '@material-ui/icons/Alarm';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import {NavLink, Route} from 'react-router-dom';
import {Counter} from "./Components/Counter/Counter";
import ToDo from "./Components/ToDo/ToDo";
import {Profile} from "./Components/Profile/Profile";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Project
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>

                    <Divider/>
                    <List>

                        <NavLink to='/counter' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><AlarmIcon/></ListItemIcon>
                                <ListItemText primary='Counter'/>
                            </ListItem>
                        </NavLink>

                        <NavLink to='/users' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><GroupAddIcon/></ListItemIcon>
                                <ListItemText primary='Users'/>
                            </ListItem>
                        </NavLink>

                        <NavLink to='/profile' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><PersonIcon/></ListItemIcon>
                                <ListItemText primary='Profile'/>
                            </ListItem>
                        </NavLink>

                        <NavLink to='/todo' style={{textDecoration:'none'}}>
                            <ListItem button>
                                <ListItemIcon><FormatListNumberedIcon/></ListItemIcon>
                                <ListItemText primary='ToDo List'/>
                            </ListItem>
                        </NavLink>

                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                <Route path="/counter" render={() => <Counter/>}/>
                <Route path="/todo" render={() => <ToDo/>}/>
                <Route path="/profile" render={() => <Profile/>}/>
            </main>
        </div>
    );
}