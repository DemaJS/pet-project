import React from "react";
import {PostItem} from "../Test";
import {Button} from "../Test-utils/Button";

type Props = {
    post:PostItem
    deletePost:(id:string) => void
}

export const Post:React.FC<Props> = ({post, deletePost}) => {

    return (
        <>
            <div>{post.tittle}</div>
            <div>{post.body}</div>
            <Button onClick={() => deletePost(post.id)}>DELETE POST</Button>
            <hr/>
        </>
    )
}