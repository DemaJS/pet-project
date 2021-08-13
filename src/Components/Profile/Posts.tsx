import React, {ChangeEvent, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from '@material-ui/icons/Send';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";


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
        <>
            <div style={{marginBottom:'10px'}}>
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
                        <Card  elevation={2} key={el.id}
                               style={{marginTop:'10px',maxWidth:'500px',width:'500px'}}>
                            <CardHeader
                                avatar={
                                    <Avatar style={{height:'70px',width:'70px'}}/>
                                }
                                title={el.name}
                                subheader={el.message}
                            />
                        </Card>
                    )
                })
            }
        </>
    );
}