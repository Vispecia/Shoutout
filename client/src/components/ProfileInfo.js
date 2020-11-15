import React, {useState, useEffect, useContext} from 'react';
import Post from './Post';
import '../css/ProfileInfo.css';
import PostBox from './PostBox';
import { UserContext } from '../App';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const shoutCounter__LowerBOUND = 3


const TabPanel = ({value,index,children})=>{
    return(
        <div>
            {
                value === index && (
                <div>{children}</div>
                )
            }
        </div>
    )
}



const ProfileInfo = ()=>{

    const {state,dispatch} = useContext(UserContext);
    const [posts,setPosts] = useState([]);
    const [shoutoutReplies,setShoutoutReplies] = useState([]);
    const [reposts,setRePosts] = useState([]);
    const [shoutouts,setShoutouts] = useState([]);
    const [tabIndex,setTabIndex] = useState(0);

    useEffect(()=>{

        fetch('/s-my-posts',{
            method:"get",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setPosts(data.posts);

            const shouts = data.posts.filter(post=>{
                return post.shoutouts.length >= shoutCounter__LowerBOUND
            })


            if(shouts.length)
            setShoutouts(shouts)

        })

    },[posts,shoutouts])

    useEffect(()=>{

        fetch('/s-my-reposts',{
            method:"get",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{

            const newPosts = data.posts.filter(post=>{

                return state && post.reposts.includes(state._id)

                // if(state)
                // {
                //     if(post && post.reposts.includes(state._id))
                //     return post;
                // }
            })
            setRePosts(newPosts);
        })

    },[reposts])


    useEffect(()=>{

        fetch('/s-all-posts',{
            method:"get",
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
           
            const replies = data.posts.filter(post=>{
                return state && post.shoutouts.includes(state._id) && post.shoutoutReplies.length>0
            })

            // if(replies !== undefined)
            // {
            //     replies.forEach(element => {
            //                 console.log(element.shoutoutReplies.length)
            //             });
            // }

            setShoutoutReplies(replies);
            //We got all those posts which we shoutouted to. Now show replies if exist at appropriate place of each post.
           
        })

    },[shoutoutReplies])




    const handleChange = (event,newValue)=>{
        setTabIndex(newValue);
    }

    const replyShouters = (postId)=>{
        
        fetch('s-reply-to-shouters',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text:"Thanks for reposting",
                postId
            })
        })
        .then(res=>res.json())
        .then(result=>{
            
        })
    }


    return (
        <div className="profileInfo">
            <div className="profileInfo__header">
                <h2>{state ? state.username : "loading"}</h2>
            </div>
            <PostBox/> 
            <Paper square>
            <Tabs
                value={tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Posts"/>
                <Tab label="Reposts" />
                <Tab label="Shoutouts" />
                <Tab label="Replies" />
            </Tabs>
            </Paper>

            <TabPanel value={tabIndex} index={0}>
                {
                    posts.length>0 ?

                    posts.map(post=>{
                        if(post)
                        {
                            return (
                            <Post post={post}/>
                           )
                        }                        
                    })
                    :
                    <h1 style={{opacity:0.3,color:"red",textAlign:"center"}}>No posts</h1>
                    // "post"
                }
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                {
                    reposts.length>0 ?

                    reposts.map(post=>{
                        if(post)
                        {
                            return (
                            <Post post={post}/>
                           )
                        }     
                    })
                    :
                    <h1 style={{opacity:0.3,color:"red",textAlign:"center"}}>No reposts</h1>
                    

                    // "repost"
                }
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                {
                    shoutouts.length>0 ?
                    <div>                    
                        {
                            shoutouts.map(post=>{
                                if(post)
                                {
                                    return (
                                        <div>
                                            <div>
                                                <h1 style={{marginBottom:8,cursor:"pointer"}} onClick={()=>replyShouters(post._id)}>Reply</h1> 
                                            </div> 
                                            <Post post={post}/>
                                        </div>
                                    
                                   )
                                }     
                            })
                        }
                    </div>
                    
                    :
                    <h1 style={{opacity:0.3,color:"red",textAlign:"center"}}>No shoutouts</h1>

                    // "repost"
                }
            </TabPanel>
            <TabPanel value={tabIndex} index={3}>
                {
                    shoutoutReplies.length>0 ?

                    shoutoutReplies.map(post=>{
                        if(post)
                        {
                            return (
                                <div>
                                    <div>
                                        <h1>{post.shoutoutReplies}</h1>
                                    </div>
                                    <Post post={post}/>
                                </div>
                            
                           )
                        }     
                    })
                    :
                    <h1 style={{opacity:0.3,color:"red",textAlign:"center"}}>Nobody reply to your shoutout yet!</h1>
                    

                    // "repost"
                }
            </TabPanel>
            
            
        </div>
    );
}



export default ProfileInfo