import React from "react";
import {Post} from "./Post";
import {PostItem} from "../Test";

type Props = {
    posts: Array<PostItem>
    tittle:string
    deletePost: (id:string) => void
}

export const PostList:React.FC<Props> = ({posts,tittle, deletePost}) => {


    return (
        <>
            <h1>{tittle}</h1>
            {
                posts.map(el => {
                    return (
                        <Post key = {el.id} post = {el} deletePost={deletePost}/>
                    )
                })
            }
        </>
    )
}