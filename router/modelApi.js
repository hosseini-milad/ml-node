const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const models = require('../models/main/models');

router.post('/models-list',jsonParser,auth, async (req,res)=>{
    try {
        const modelsList = await models.find({userId:req.headers['userid']})
        res.status(200).json({data: modelsList,message:"model List"})
        } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/create-model',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        userFolder:   req.body.userFolder,
        userId:  req.headers["userid"],
        status:   "initial", 
        name:   req.body.name,
        desription:   req.body.desription,
        dataset:   req.body.dataset,
        datasetUrl:   req.body.datasetUrl,
        trainData:   req.body.trainData,
        trainUrl:req.body.trainUrl,
        date: Date.now()
      }
        const modelDetail = await models.create(data)
      res.status(200).json({data: modelDetail,message:"model Created"})
    }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/find-model',auth,jsonParser, async (req,res)=>{
  try {

        const modelData = await models.findOne({_id:req.body.id});
        res.status(200).json({model:modelData,message:"Model Data"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})

module.exports = router;