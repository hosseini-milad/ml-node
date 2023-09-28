const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const User = require("../models/auth/users");

router.post('/login',jsonParser, async (req,res)=>{
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
          res.status(400).json({error:"All input is required"});
          return;
        }
        // Validate if user exist in our database
        const user = await User.findOne({username: username });
        //console.log(user)
        if(!user){
          res.status(400).json({error:"user not found"});
          return;
        }
        if(!user.password){
          res.status(400).json({error:"password not set"});
          return;
        }
        if(user.active==="false"){
          res.status(400).json({error:"user not active"});
          return;
        }
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {expiresIn: "72h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        if (user && password===user.password){
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {expiresIn: "2h",} 
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        else{
          res.status(400).json({error:"Invalid Password"}); 
        }
        } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const createOTP=(cName)=>{
  return(cName+(Math.floor(Math.random() * 10000000)
   + 10000000))
}

router.post('/register',jsonParser, async (req,res)=>{
  try {
      const data = {
        username: req.body.username,
        cName: req.body.cName,
        sName:  req.body.sName,
        phone: req.body.phone,
        password: req.body.password,
        meliCode: req.body.meliCode,
        email: req.body.email,
        
        access:"request",
        group: req.body.group,
        token: req.body.token,
        otp:null,
        active:false,
        status: req.body.status,
        Code: req.body.Code,
        date: Date.now()
      }
      if (!(data.cName && data.sName&&data.phone&&data.email)) {
        res.status(400).json(
          {error:"All input is required"});
        return;
      } 
      // Validate if user exist in our database
      const user = await User.findOne({$or:[
        {username: data.username },{phone:data.phone}]});
      if(!user){
        data.password = data.password&&await bcrypt.hash(data.password, 10);
        
        const newOtp=createOTP(data.cName)
        const user = 
          await User.create({...data,otp:newOtp});

        res.status(201).json({user:user,message:"User Created"})
        return;
      }
      else{
        res.status(400).json(
          {error:"User Already Exists"});
        return;
      }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/list-users',auth,jsonParser, async (req,res)=>{
  try {
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
      const data = {
        cName: req.body.cName,
        sName: req.body.sName,
        phone: req.body.phone,
        email: req.body.email,
        access: req.body.access,
        group: req.body.group,
        offset:req.body.offset?req.body.offset:0,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.findOne({_id:req.headers["userid"]});
      //console.log(userOwner)
      const user = await User.aggregate([
        { $match : data.access?{access:data.access}:{}},
        { $match : data.cName?{cName:{$regex: data.cName}}:{}},
        { $match : data.sName?{sName:{$regex: data.sName}}:{}},
        { $match : data.email?{email:{$regex: data.email}}:{}},
        { $match : data.phone?{phone:{$regex: data.phone}}:{}},
        
    ])
    var pageUser=[];
    for(var i=data.offset;i<data.offset+parseInt(pageSize);i++)
      user[i]&&pageUser.push(user[i])
      res.status(200).json({user:pageUser,message:"User List",size:user.length})
      
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/find-users',auth,jsonParser, async (req,res)=>{
  try {

        const userOwner = await User.findOne({_id:req.headers["userid"]});
        res.status(200).json({user:userOwner,message:"User Data"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/find-user-admin',auth,jsonParser, async (req,res)=>{
  try {
        const userOwner = await User.findOne({_id:req.headers["userid"]});
        const userData = await User.findOne({_id:req.body.userId});
        /*if(userData&&userData.access==="customer")
          await User.updateOne({_id:req.body.userId},{$set:{active:"true"}});*/
        res.status(200).json({user:userData,message:"User Data"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/active-user',jsonParser, async (req,res)=>{

  try {
        const userData = await User.findOne({otp:req.body.otp});
        if(userData){
          await User.updateOne({otp:req.body.otp},
            {$set:{active:"true",otp:""}});
          res.status(200).json({user:userData,message:"User Activated"})
          }
        else{
          res.status(500).json({error:"Expired OTP"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/change-user',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        username: req.body.username,
        cName: req.body.cName,
        sName:req.body.sName,
        phone:req.body.phone,
        email:req.body.email,
        meliCode:req.body.meliCode,
        active:req.body.active,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.updateOne({_id:ObjectID(req.body._id)},
        {$set:data});
      //console.log(await bcrypt.compare(userOwner.password, data.oldPass))
      
      res.status(200).json({user:userOwner,message:"User Data Changed."})
      
      } 
  catch(error){
    var errorTemp=error.message.includes("duplicate")?
      "duplicate Value":error.message
      res.status(500).json({error: errorTemp})
  }
})


module.exports = router;