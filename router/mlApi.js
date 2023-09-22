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
const normalize = require('array-normalize')

router.post('/train-model', async (req,res)=>{
  const datasetUrl = req.body.datasetUrl
  const datasetName = req.body.datasetName
  const datasetFolder = req.body.datasetFolder
  try{
    const stream = fs.createReadStream(datasetUrl);
    const rl = readline.createInterface({ input: stream });
    let data = [];

    rl.on("line", (row) => {
      data.push(row.split(","));
    });
    
    rl.on("close", async () => {
      data.shift()
      const trainResult = await trainFunction(data,datasetFolder,datasetName)
      res.status(200).json({result:trainResult});
    });

  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/test-data', async (req,res)=>{
const testData = req.body.testData
const config = {
  binaryThresh: 0.5, // ¯\_(ツ)_/¯
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
};

const net = new brain.NeuralNetwork(config);
try{
  const networkState = JSON.parse(fs.readFileSync("./models/milad/Firewall.json", "utf-8"));
  net.fromJSON(networkState);
  var testResult=[]
  for(var i=0;i<testData.length;i++)
    testResult.push(
      net.run(normalize(testData[i].split(',').map(str => {
        return parseFloat(str);
      }))))
  res.status(200).json({testResult: testResult})
}
catch(error){
    res.status(500).json({message: error.message})
}
})

const trainFunction=async(row,dsFolder,dsName)=>{
  const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };

  const net = new brain.NeuralNetwork(config);
  net.train(
    row.map((data,i)=>(
      {
        output: [(data.pop()==="Benign"?0:1)],
        input: normalize(data.map(str => {
          return parseFloat(str);
        }))
      }
    )) ,{
      iterations: 100
    }
    ); 
 
    const networkState = net.toJSON();
    const jsonPath = `./models/${dsFolder}/Deep${dsName}.json`
fs.writeFileSync(jsonPath,JSON.stringify(networkState), "utf-8");

  return({message:"train completed!",url:jsonPath})
}

module.exports = router;