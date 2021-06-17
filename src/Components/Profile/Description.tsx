import React from "react";
import {Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CodeIcon from '@material-ui/icons/Code';

export function Description() {

    return (
        <List dense={true}>
        <ListItem>

                <List dense={true}>
                    <ListItem>
                        <ListItemIcon>
                            <WorkOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Looking for a job"/>
                        <Checkbox/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CodeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Skills:"/>
                        <List dense={true}>
                            <ListItem>JavaScript</ListItem>
                            <Divider/>
                            <ListItem>TypeScript</ListItem>
                            <Divider/>
                            <ListItem>React</ListItem>
                            <Divider/>
                        </List>
                    </ListItem>
                </List>
        </ListItem>

        <ListItem>

                <List dense={true}>
                    <ListItem>
                        <ListItemIcon>
                            <InstagramIcon/>
                        </ListItemIcon>
                        <ListItemText primary="https:"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LinkedInIcon/>
                        </ListItemIcon>
                        <ListItemText primary="https:"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FacebookIcon/>
                        </ListItemIcon>
                        <ListItemText primary="https:"/>
                    </ListItem>
                </List>
        </ListItem>

        </List>
    )
}