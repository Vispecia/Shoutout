const jwt = require('jsonwebtoken')
const {JWT_SEC} = require('../keys/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

// middleware to access private content

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json({error:"You must logged in"})

    const token = authorization.replace("Bearer ","");
    
    jwt.verify(token,JWT_SEC,(err,payload)=>{
        if(err) return res.status(401).json({error:"You must logged in"})

        const {_id} = payload;
        User.findById({_id})
        .then(user=>{
            req.user=user;
            next();
        })
    }) 

}
