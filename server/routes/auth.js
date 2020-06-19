const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../keys");
const requireLogin=require('../middleware/requireLogin');

router.post('/signup',(req,res)=>{
    const{name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(422).json({error: " please add all fields"});
    }
    else{
        User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser)
        {
            return res.status(422).json({error: " user already exists!"});
        }
        bcrypt.hash(password,8)
        .then(hashedPass=>{
            const user= new User({
                name,email,
                password:hashedPass
            })
            user.save()
            .then(user=>{
                res.json({message:"saved user details successfully!!"});
            })
            .catch(err=>{
                console.log(err)
            })   
        })
        .catch(err=>{
            console.log(err)
        })

        })
        
    } 
})


router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error: "Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(passMatch=>{
            if(!passMatch){
                return res.status(422).json({error: "Invalid email or password"})
            }
            else{
               const token= jwt.sign({_id:savedUser._id},JWT_SECRET);
               const {_id,name,email,followers,following,about,dp,fullName}=savedUser;
               res.json({token,user:{_id,name,email,followers,following,about,dp,fullName}})
                res.json({message: "Successfully signed in !!!"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put("/editProfile",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{dp:req.body.dp,about:req.body.about,fullName:req.body.fullName},{new:true})
    .exec((err,result)=>{
        if(err){
            res.status(422).json({err:error})
        }
        else{
            res.json(result)
        }
    })
})

module.exports=router;