const express = require('express');
const router = express.Router()
const { default: fetch } = require("node-fetch");
const brain = require("brain.js")
const fs = require("fs");
const { parse } = require("csv-parse");
const normalize = require('array-normalize')

const readline = require("readline");

router.get('/train-model', async (req,res)=>{
    try{
      const stream = fs.createReadStream("./dataset/Firewall.csv");
      const rl = readline.createInterface({ input: stream });
      let data = [];

      rl.on("line", (row) => {
        data.push(row.split(","));
      });
      
      rl.on("close", async () => {
        const trainResult = await trainFunction(data)
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
    const networkState = JSON.parse(fs.readFileSync("./models/network_state.json", "utf-8"));
    net.fromJSON(networkState);
    const testResult= net.run(normalize(testData));
    res.status(200).json({testResult: testResult})
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})
const trainFunction=async(row)=>{
  const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };

  const net = new brain.NeuralNetwork(config);
  net.train(
    row.map((data,i)=>(
      {
        output: [(data.shift()==="BENIGN"?0:1)],
        input: normalize(data.map(str => {
          return parseFloat(str);
        }))
      }
    )) ,{
      iterations: 100
    }
    ); 
 
    const networkState = net.toJSON();
fs.writeFileSync("./models/network_state.json",  JSON.stringify(networkState), "utf-8");

  return({message:"train completed!"})
}

module.exports = router;