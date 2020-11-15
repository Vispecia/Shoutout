const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const Post = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"loading"
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    reposts:[{
        type:ObjectId,
        ref:"User"
    }],
    shoutouts:[{
        type:ObjectId,
        ref:"User"
    }],
    shoutoutReplies:{
        type:String,
        default:""
    },
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }

});
mongoose.model("Post",Post);