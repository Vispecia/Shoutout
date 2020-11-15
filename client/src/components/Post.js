import React, { useContext, useState, useEffect } from 'react'
import '../css/Post.css'
import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
// import PublishIcon from '@material-ui/icons/Publish'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import GradientIcon from '@material-ui/icons/Gradient';
import { UserContext } from '../App'

/**
 * 
 * Only profile picture edit tab left. In correspond to this, now each post will have either default pic of post creator or uploaded picture as Avatar
 */

const Post=({post})=>{

    const {state,dispatch} = useContext(UserContext);
    const [show,setShow] = useState(false);
    

    useEffect(()=>{
        
    },[show])


    const deletePost = ()=>{
        fetch(`/s-delete-post/${post._id}`,{
            method:"delete",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
                    
        })
    }

    const dislike = (postId)=>{

        fetch('/s-dislike',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })

    }
    const like = (postId)=>{
        fetch('/s-like',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }
    
    const showComments = ()=>{
        if(show)
        setShow(false);
        else
        setShow(true);
    }

    const makeComment = (text,postId)=>{
        fetch('/s-comment',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text,postId
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
        })
    }

    const repost = (postId)=>{
        fetch('/s-repost',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }

    const deleteRepost = (postId)=>{
        fetch('/s-delete-repost',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
    }

    const deleteShoutout = (postId)=>{

        fetch('/s-delete-shoutout',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const shoutout = (postId)=>{

        fetch('/s-shoutout',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    return(
        <div className="post">
           <div className="post__avatar">
                <Avatar src=""/>
           </div>
           <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {post.postedBy.username} 
                            <span className="post__headerSpecial">
                                { undefined ? <VerifiedUserIcon className="post__badge"/> : null}
                                @{post.postedBy.username}
                            </span>
                            { 
                                state ? post.postedBy._id === state._id ? 
                                        <IconButton className="post__delete" component="span" onClick={()=>deletePost()}> <DeleteIcon style={{fontSize:14}}/> </IconButton>
                                : null 
                                : null
                            }
                        </h3>
                        
                    </div>
                    <div className="post__headerDescription">
                        <p>
                            {post.body}
                        </p>
                    </div>
                </div>

                { post.photo !== "loading" ? <img src={post.photo} alt="" style={{height:400,width:400}}/> : null}
                <div className="post__footer">

                    {
                        <IconButton onClick={()=>showComments()}><ChatBubbleIcon fontSize="small"/></IconButton>
                    }

                    {
                        post.reposts.includes(state._id) ? 
                        <IconButton style={{color:"#50b7f5"}} onClick={()=>deleteRepost(post._id)}><RepeatIcon fontSize="small"/></IconButton>
                        :
                        post.postedBy._id !== state._id ?
                        <IconButton onClick={()=>repost(post._id)}><RepeatIcon fontSize="small"/></IconButton>     
                        :
                        null                                          
                        
                    }
                    

                    {
                        post.likes.includes(state._id) ?
                        <IconButton style={{color:"red"}} onClick={()=>dislike(post._id)}>
                            <FavoriteBorderIcon fontSize="small"/>
                        </IconButton>

                        :

                        <IconButton onClick={()=>like(post._id)}>
                            <FavoriteBorderIcon fontSize="small"/>
                        </IconButton>
                    }   
                    {
                        post.shoutouts.includes(state._id) ?
                        <IconButton style={{color:"green"}} onClick={()=>deleteShoutout(post._id)}> <GradientIcon/> </IconButton>   
                        :
                        <IconButton onClick={()=>shoutout(post._id)}> <GradientIcon/> </IconButton>
                    }          
                        
                    {/* <PublishIcon fontSize="small"/> */}
                </div>
                {
                        show ? 
                        <div>
                            {
                            post.comments.map(comment=>{
                                return (
                                <h6><span>{comment.postedBy.username}</span> <span style={{fontWeight:"500"}}>{comment.text} </span></h6>
                                )
                            })
                            } 
                            <form onSubmit={(e)=>{
                            e.preventDefault();
                            makeComment(e.target[0].value,post._id);
                            e.target[0].value='';
                            }}>
                            <input type="text" placeholder="add a comment" className="post__commentInput"/>  
                            </form>   
                        </div> 
                        :
                        null
                }
           </div>
        </div>
    )
}

export default Post;