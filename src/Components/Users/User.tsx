import React from 'react'
import {Card, Grid} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

export function User() {

    return (
        <Grid item>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" style={{height:'100px',width:'100px'}}>
                            VD
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
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