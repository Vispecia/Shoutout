import React, { useState, useEffect, useContext } from 'react'
import '../css/PostBox.css'
import { Button, Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { UserContext } from '../App';

const PostBox=()=>{

    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [imageUrl,setImageURL] = useState("");
    const {state,dispatch} = useContext(UserContext);


    useEffect(()=>{

        if(imageUrl)
        {
            fetch('/s-create-post',{
                method:"post",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    body,imageUrl
                })
            })
            .then(res=>res.json())
            .then(data=>{
                                
            })
        }

    },[imageUrl])

    const postDetails = ()=>{

        if(image)
        {
            const data = new FormData();
            data.append("file",image);
            data.append("upload_preset","shoutout")
            data.append("cloud_name","vishesh888")
            
            fetch('https://api.cloudinary.com/v1_1/vishesh888/image/upload',{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(res2=>{
                setImageURL(res2.url)
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else
        {
            fetch('/s-create-post',{
                method:"post",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    body
                })
            })
            .then(res=>res.json())
            .then(data=>{
            })
        }
    }



    return(
        <div className="postbox">
            <form>
                <div className="postbox__input">
                    <Avatar src=""/>
                    <input type="text" placeholder="Post" onChange={(e)=>setBody(e.target.value)}/>
                </div>
                {/* <input
                className="postbox__imageInput"
                 type="text" 
                 placeholder="Enter image url"/> */}
                 <input accept="image/*" className="postbox__fileInput" id="icon-button-file" type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                <label htmlFor="icon-button-file">
                    <IconButton aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
                <Button className="postbox__postButton" onClick={()=>postDetails()}>Post</Button>
            </form>       
        </div>
    )
}

export default PostBox;