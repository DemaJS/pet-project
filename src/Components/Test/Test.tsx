import React, {useMemo, useState} from 'react'
import {PostList} from "./Test-components/PostList";
import {PostForm} from "./Test-components/Post-Form";
import {v1} from "uuid";
import {Select} from "./Test-utils/Select";
import {Input} from "./Test-utils/Input";


export type PostItem = {
    [key: string]: string
}

export const Test = () => {

    const [posts, setPosts] = useState<Array<PostItem>>([
        {id: v1(), tittle: "CavaScript", body: 'Bromise, EventLoop'},
        {id: v1(), tittle: "AavaScript", body: 'Cromise, EventLoop'},
        {id: v1(), tittle: "BavaScript", body: 'Bromise, EventLoop'}
    ])

    const [sort, setSort] = useState('')

    const [search, setSearch] = useState('')


    const addPost = (newPost: PostItem) => {
        setPosts([newPost, ...posts])
    }

    const deletePost = (id: string) => {
        setPosts(posts.filter(el => el.id !== id))
    }

    const selectOnChange = (val: string) => {
        setSort(val)
    }

    const sortedPosts = useMemo(() => {
        if (sort) {

            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts

    }, [posts, sort])

    const searchHandler = useMemo(() => {
        return sortedPosts.filter(el => el.tittle.toLowerCase().includes(search))
    }, [sortedPosts, search])




    return (
        <div>
            <div>
                <Select defaultOption='Сортировка'
                        value={sort}
                        onChange={selectOnChange}
                        options={[
                            {value: 'tittle', name: 'По названию'},
                            {value: 'body', name: 'По описанию'}
                        ]}/>
                <Input placeholder='Search...'
                       value={search}
                       onChange={event => setSearch(event.currentTarget.value)}/>
            </div>
            <PostList posts={searchHandler} tittle='JS' deletePost={deletePost}/>
            <PostForm addPost={addPost}/>
        </div>
    )
}