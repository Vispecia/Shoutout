import React, { useState, useEffect } from 'react'
import '../css/Feed.css'
import PostBox from './PostBox'
import Post from './Post'


const Feed=()=>{

    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        fetch('/s-all-posts',{
            method:"get",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            
            setPosts(data.posts);
        })
    },[posts])
    
    return(
        <div className="feed">
            <div className="feed__header">
                <h2>Feed</h2>
            </div>

            <PostBox/>

            {
                posts.map(post=>{
                    return (
                        <Post post={post}/>
                    )
                })
            }
            
            
        </div>
    )
}

export default Feed;