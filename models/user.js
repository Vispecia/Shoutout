const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const User = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }    
});

mongoose.model("User",User);