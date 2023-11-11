const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const readline = require("readline");
const { parse } = require('fast-csv');
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const models = require('../models/main/models');
const modelDetail = require('../models/main/modelDetail');
const ManualTrain = require('../middleware/manualTrain');

router.post('/models-list',jsonParser,auth, async (req,res)=>{
    try {
        const modelsList = await models.find({userId:req.headers['userid']})
          .find({type:(req.body.type?req.body.type:'')})
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
        type:   req.body.type,
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
router.post('/find-model-detail',auth,jsonParser, async (req,res)=>{
  try {
        const modelData = await modelDetail.findOne({modelID:req.body.id});
        var parseData = []
        try{
          parseData = modelData.split(',')
        } catch{}
        res.status(200).json({data:modelData,message:"Model Found"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/set-model-detail',auth,jsonParser, async (req,res)=>{
  try {

        const modelData = await models.findOne({_id:req.body.id});
        console.log(modelData.datasetUrl)
        //var modelDetail = ''
        const stream = fs.createReadStream(modelData.datasetUrl);
    const rl = readline.createInterface({ input: stream });
    let data = '';
    let record = 0
    rl.on("line", (row) => {
      data=row;
      rl.close();
 
    });
    rl.on("close", async () => {

      var parseData = []
      try{
        parseData = data.replace(/\"/g, '').split(',')
      }
      catch{}
      const detail = await modelDetail.findOne({modelID:req.body.id})
        if(detail)
        modelDetail.updateOne({modelID:req.body.id},{$set:{header:parseData}})
      else modelDetail.create({modelID:req.body.id,header:parseData})
      res.status(200).json({data:parseData,message:"Manual Model Data"})
      
    });
        
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/update-model-weight',auth,jsonParser, async (req,res)=>{
  try {
        const modelWeight = await modelDetail.updateOne({modelID:req.body.id},
          {$set:{weight:req.body.weight,
          normWeight:req.body.normWeight}})
        
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/create-manual-model',auth,jsonParser, async (req,res)=>{
  try {
      const modelData = await models.findOne({_id:req.body.id})
      if(modelData){
      const modelWeight = await modelDetail.findOne({modelID:req.body.id})
      var trainString=ManualTrain(modelWeight)
      const jsonPath = `./trainModels/${modelData.userFolder}/Rigid${modelData.dataset}.json`
      fs.writeFileSync(jsonPath,JSON.stringify(trainString.model), "utf-8");
      await models.updateOne({_id:req.body.id},
        {$set:{trainUrl:jsonPath,dataRecord:1,
          dataColumn:modelWeight.normWeight&&modelWeight.normWeight.length}})
      res.status(200).json({data:trainString})
      }
      else
        res.status(500).json({message: "Model Not Found"})
  } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
module.exports = router;