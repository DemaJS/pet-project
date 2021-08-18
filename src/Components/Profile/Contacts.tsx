import React from "react";
import {Card, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LanguageIcon from '@material-ui/icons/Language';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Grid from "@material-ui/core/Grid";

export const Contacts = () => {

    return (

        <Grid container spacing={2}>

            <Grid item xs={12} lg={6}>
                <Card elevation={2} style={{border:'solid 1px #3f51b5'}}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <GitHubIcon/>
                            </ListItemIcon>
                            <ListItemText primary="https:"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FacebookIcon/>
                            </ListItemIcon>
                            <ListItemText primary="https:"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <InstagramIcon/>
                            </ListItemIcon>
                            <ListItemText primary="https:"/>
                        </ListItem>
                    </List>
                </Card>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Card elevation={2} style={{border:'solid 1px #3f51b5'}}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <TwitterIcon/>
                            </ListItemIcon>
                            <ListItemText primary="https:"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <LanguageIcon/>
                            </ListItemIcon>
                            <ListItemText primary="https:"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <YouTubeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="https:"/>
                        </ListItem>
                    </List>
                </Card>
            </Grid>

        </Grid>

    )
}