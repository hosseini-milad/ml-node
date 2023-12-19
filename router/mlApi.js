const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const brain = require("brain.js")
const readline = require("readline");
const fs = require("fs");
const normalize = require('array-normalize');
const ProgressSchema = require('../models/main/progress');
const ModelSchema  = require('../models/main/models');
const webLogModel = require('../models/Log/webLogModel');
const String2Float = require('../middleware/String2Float');
const OutPutResult = require('../middleware/OutputResult');



router.post('/test-data', async (req,res)=>{
const testData = req.body.testData
const config = {
  binaryThresh: 0.5, // ¯\_(ツ)_/¯
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

const net = new brain.NeuralNetwork(config);
try{
  //console.log(req.body.datasetUrl) 
  const networkState = JSON.parse(fs.readFileSync(req.body.datasetUrl, "utf-8"));
  net.fromJSON(networkState);
  var testResult=''
  //console.log(networkState) 
  //for(var i=0;i<testData.length;i++){
    testResult=
      net.run(normalize(testData.map(str => {
        return parseFloat(str);
      })))
    //}
  res.status(200).json({testResult: testResult})
}
catch(error){
    res.status(500).json({message: error.message})
}
})

router.post('/test-data-bulk', async (req,res)=>{
  const testData = req.body.testData
  const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };
  
  const net = new brain.NeuralNetwork(config);
  try{
    //console.log(req.body.datasetUrl) 
    const networkState = JSON.parse(fs.readFileSync(req.body.datasetUrl, "utf-8"));
    net.fromJSON(networkState);
    var testResult=[]
    for(var i=0;i<testData.length;i++){
      testResult.push({data:testData[i].data,result:
        net.run(normalize(testData[i].data.split(',').map(str => {
          return parseFloat(String2Float(str))
        })))[0]
      })
      }
    res.status(200).json({testResult: testResult})
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
  })
const normalFloat=(str)=>{
  var retStr =parseFloat(str)
  if(isNaN(retStr))retStr=str.charCodeAt(0)

  return(retStr)
} 

router.post('/train-model',jsonParser, async (req,res)=>{
  const modelId = req.body.modelId
  const datasetUrl = req.body.datasetUrl
  const datasetName = req.body.datasetName
  const datasetFolder = req.body.datasetFolder
  try{
    const stream = fs.createReadStream(datasetUrl);
    const rl = readline.createInterface({ input: stream });
    let data = [];
    let record = 0
    rl.on("line", (row) => {

      data.push(row.split(","));
    });
    
    rl.on("close", async () => {
      data.shift()
      //
      const trainResult = await trainFunction(data,
        datasetFolder,datasetName,modelId,req.headers["userid"])
      const modelsList = await ModelSchema.find({userId:req.headers['userid']})
      res.json({data:modelsList,result:trainResult});
      
    });

  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

const trainFunction=async(row,dsFolder,dsName,modelId,userId)=>{
  var ProgressNow = await ProgressSchema.findOne({userId:userId})
  const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'leaky-relu' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };
  const net = new brain.NeuralNetwork(config);
  var records = 0
  if(!ProgressNow) ProgressNow=await ProgressSchema.create({
      userId:userId,status:"training",
      dataset:dsName,percent:0,date:Date.now()})
  net.train(
    row.map((data,i)=>(
      {
        output: [OutPutResult(data.pop())],
        input: normalize(data.map(str => {
          return parseFloat(String2Float(str));
        }))
      }
    )),
    {iterations: 100}//,log: (stats) => regStats(stats,userId,dsName)}
    ); 
    const networkState = net.toJSON();
    const jsonPath = `./trainModels/${dsFolder}/Deep${dsName}.json`
    fs.writeFileSync(jsonPath,JSON.stringify(networkState), "utf-8");
    await ModelSchema.updateOne({_id:modelId},{$set:{trainUrl:jsonPath,dataRecord:row.length}})
    await ProgressSchema.updateOne(
      {userId:userId},{$set:{dataset:dsName,
        date:Date.now(),status:"trained",
        percent:100}})
  return({message:"train completed!",url:jsonPath})
}
router.get('/test-trace', async (req,res)=>{
  var i = 1,
    max = 5;

  //set the appropriate HTTP header
  res.setHeader('Content-Type', 'text/html');

  //send multiple responses to the client
  for (; i <= max; i++) {
    
    console.log('<h1>This is the response #: ' + i + '</h1>')
  }

  //end the response process
  res.end();
  })



module.exports = router;