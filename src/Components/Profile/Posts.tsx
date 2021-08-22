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
import ClearIcon from '@material-ui/icons/Clear';
import {v1} from "uuid";


type postType = {
    id: string
    name: string
    message: string
}

export function Posts() {

    const [posts, setPosts] = useState<Array<postType>>([
        {
            id: '1',
            name: 'Mosher’s Law of Software Engineering',
            message: ' Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы уволили.',
        },
        {
            id: '2',
            name: 'Larry Wall',
            message: 'Многие из вас знакомы с достоинствами программиста. Их всего три, и разумеется это: лень, нетерпеливость и гордыня.',
        },
        {
            id: '3',
            name: 'Martin Golding',
            message: 'Всегда пишите код так, будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете.',
        },
        {
            id: '4',
            name: 'Jazzwant',
            message: 'Программирование — это разбиение чего-то большого и невозможного на что-то маленькое и вполне реальное.',
        },
    ])
    const [newPost, setNewPost] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPost(e.currentTarget.value)
    }
    const addPost = (message: string) => {
        let post = {id: v1(), name: 'UserName', message: message, data: '20.20.2021'}
        setPosts([post, ...posts])
        setNewPost('')
    }
    const deletePost = (id:string) => {
        setPosts(posts.filter(el => el.id !== id))
    }

    return (
        <Card elevation={2} style={{borderRadius: '20px', backgroundColor: '#f3f2ef'}}>
            <div style={{padding: '10px 10px 10px 10px'}}>
                <TextField
                    onChange={onChangeHandler}
                    value={newPost}
                    label="Add post"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon/>
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
                                    <Avatar alt={el.name} src="/static/images/avatar/1.jpg"/>
                                </ListItemAvatar>
                                <div style={{display:'flex'}}>
                                    <ListItemText
                                        primary={el.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                </Typography>
                                                {el.message}
                                            </React.Fragment>
                                        }
                                    />
                                    <IconButton style={{justifyContent:'end'}} onClick={() => {deletePost(el.id)}}>
                                        <ClearIcon/>
                                    </IconButton>
                                </div>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                        </List>
                    )
                })
            }
        </Card>
    );
}


