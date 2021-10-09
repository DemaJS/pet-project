import React, {useState} from "react";
import {Input} from "../Test-utils/Input";
import {Button} from "../Test-utils/Button";
import {PostItem} from "../Test";
import {v1} from "uuid";

type Props = {
    addPost: (newPost: PostItem) => void
}

export const PostForm: React.FC<Props> = ({addPost}) => {

    const [postText, setPostText] = useState({tittle: '', body: ''})

    const addPostHandler = () => {
        let newPost = {
            id:v1(),
            ...postText
        }
        addPost(newPost)
        setPostText({tittle: '', body: ''})
    }

    return (
        <>
            <Input placeholder='tittle'
                   onChange={(event => setPostText({...postText, tittle: event.currentTarget.value}))}
                   value={postText.tittle}/>
            <Input placeholder='body'
                   onChange={(event => setPostText({...postText, body: event.currentTarget.value}))}
                   value={postText.body}/>
            <Button onClick={addPostHandler}>ADD POST</Button>
        </>
    )
}