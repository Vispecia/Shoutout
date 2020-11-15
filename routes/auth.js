const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SEC} = require('../keys/keys')
const User = mongoose.model("User")


router.post('/s-signup',(req,res)=>{
    const {username,email,password} = req.body

    if(!username || !password || !email) return res.status(422).json({error:"Please fill all the fields"});

    User.findOne({username})
    .then(user=>{
        if(user) return res.status(422).json({error:"Username is already taken"});

        User.findOne({email})
        .then(user2=>{
            if(user2) return res.status(422).json({error:"User is already registered with this email id. Try login!"});


            bcrypt.hash(password,15)
            .then(hashedPass=>{
                    const newUser = new User({
                        username,
                        email,
                        password:hashedPass
                    });

                    newUser.save()
                    .then(success=>{
                        return res.json({message:"user saved"});
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            })          

        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })

});

router.post('/s-signin',(req,res)=>{
    const {username,password} = req.body;

    if(!username || !password) return res.status(422).json({error:"Please fill all the fields"});

    User.findOne({username})
    .then(user=>{
        if(!user) return res.status(422).json({error:"Invalid username or password"});

        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(422).json({error:"Invalid username or password"});
            
            const token = jwt.sign({_id:user._id},JWT_SEC);
            const {_id,username,email} = user;
            return res.json({token,user:{
                _id,username,email
            }})
            
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })

})


module.exports = router;