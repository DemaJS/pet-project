import React, {ChangeEvent, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from '@material-ui/icons/Send';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";


type postType = {
    id:number
    name:string
    message:string
    data:string
}

export function Posts() {

    const [posts,setPosts] = useState<Array<postType>>([
        {id:1, name:'Don', message:'Kavabanga', data:'20.20.2021'},
        {id:2, name:'Leo', message:'Kavabanga', data:'20.20.2021'},
        {id:3, name:'Mike', message:'Kavabanga', data:'20.20.2021'},
        {id:4, name:'Raf', message:'Kavabanga', data:'20.20.2021'},
    ])
const [newPost,setNewPost] = useState('')

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewPost(e.currentTarget.value)
    }
    const addPost = (message:string) => {
        let post = {id:1, name:'Don', message:message, data:'20.20.2021'}
        setPosts([post,...posts])
        setNewPost('')
    }

    return (
        <Card elevation={2}>
            <div style={{padding:'10px 10px 10px 10px'}}>
                <TextField
                    onChange={onChangeHandler}
                    value={newPost}
                    label="Add post"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <IconButton onClick={() => addPost(newPost)}>
                    <SendIcon fontSize="large"/>
                </IconButton>
            </div>

            {
                posts.map(el => {
                    return (
                        <List>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    )
                })
            }
        </Card>
    );
}


