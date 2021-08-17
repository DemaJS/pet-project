import React from "react";
import {Card, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CodeIcon from '@material-ui/icons/Code';
import Grid from "@material-ui/core/Grid";

export function Description() {

    return (

        <Grid container spacing={2}>

            <Grid item xs={6}>
                <Card elevation={2}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <WorkOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Looking for a job"/>
                            <Checkbox/>
                        </ListItem>
                    </List>
                </Card>
            </Grid>

            <Grid item xs={6}>
                <Card elevation={2}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <CodeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Skills:"/>
                        </ListItem>
                        <ListItemText>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemText primary="React"/>
                                    <ListItemText primary="JavaScript"/>
                                    <ListItemText primary="TypeScript"/>
                                </ListItem>
                            </List>
                        </ListItemText>
                    </List>
                </Card>
            </Grid>

        </Grid>

    )
}