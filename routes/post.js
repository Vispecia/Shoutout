const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requestLogin = require('../middleware/requestLogin')


router.post('/s-create-post',requestLogin,(req,res)=>{
    const {body,imageUrl} = req.body
    if(!body || body.length>250) return res.status(422).json({error:"Empty field or body length crossed 250 limit"})

    req.user.password = undefined
    const newPost = new Post({
        body,
        photo:imageUrl,
        postedBy:req.user
    });

    newPost.save()
    .then(success=>{
        return res.json({post:success})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/s-all-posts',requestLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(posts=>{
        return res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/s-my-posts',requestLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(posts=>{
        return res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/s-my-reposts',requestLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id username")
    .populate("reposts.postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(posts=>{      
        return res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/s-delete-post/:postId',requestLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post) return res.status(422).json({error:err})

        if(post.postedBy._id.toString() === req.user._id.toString())
        {
            post.remove()
            .then(result=>{
                return res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

router.put('/s-like',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})

        return res.json(result)
    })
})

router.put('/s-dislike',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})

        return res.json(result)
    })
})

router.put('/s-comment',requestLogin,(req,res)=>{

    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("postedBy","_id username")
    .populate('comments.postedBy', '_id username')
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})

        return res.json(result)
    })
})

router.put('/s-reply-to-shouters',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $set:{shoutoutReplies:req.body.text}
    },{
        new:true
    },(err,result)=>{
        if(err) return res.status(422).json({error:err})

       return res.json(result)
    })
})

router.put('/s-repost',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{reposts:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})

       return res.json(result)
    }) 
})
router.put('/s-delete-repost',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{reposts:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err) return res.status(422).json({error:err})

        return res.json(result)
    })
})

router.put('/s-shoutout',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{shoutouts:req.user._id}
    },{new:true})
    .exec((err,result)=>{
        if(err)  return res.status(422).json({error:err})

        return res.json(result)
    })
})
router.put('/s-delete-shoutout',requestLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{shoutouts:req.user._id}
    },{new:true})
    .exec((err,result)=>{
        if(err)  return res.status(422).json({error:err})

        return res.json(result)
    })
})





module.exports = router;