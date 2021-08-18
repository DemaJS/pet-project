import React from "react";
import {Card, Checkbox, Chip, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import CodeIcon from '@material-ui/icons/Code';
import Grid from "@material-ui/core/Grid";
import DoneIcon from '@material-ui/icons/Done';
import DescriptionIcon from '@material-ui/icons/Description';

export function Description() {

    return (

        <Grid container spacing={2}>

            <Grid item xs={12} lg={6}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Card elevation={2} style={{border: 'solid 1px #3f51b5'}}>
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
                    <Grid item>
                        <Card elevation={2} style={{border: 'solid 1px #3f51b5'}}>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemIcon>
                                        <DescriptionIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Looking foraaaaaaaaaaaaaaaaaaaaaaaa a job"/>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Card elevation={2} style={{border: 'solid 1px #3f51b5'}}>
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
                                    <Chip
                                        icon={<DoneIcon/>}
                                        label="JavaScript"
                                        variant="outlined"
                                    />
                                </ListItem>
                                <ListItem>
                                    <Chip
                                        icon={<DoneIcon/>}
                                        label="TypeScript"
                                        variant="outlined"
                                    />
                                </ListItem>
                                <ListItem>
                                    <Chip
                                        icon={<DoneIcon/>}
                                        label="React"
                                        variant="outlined"
                                    />
                                </ListItem>
                            </List>
                        </ListItemText>
                    </List>
                </Card>
            </Grid>

        </Grid>

    )
}