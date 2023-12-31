const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const axios = require('axios');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router()
const jsonParser = bodyParser.json();
const webLogModel = require('../models/Log/webLogModel');


router.post('/webService', async (req,res)=>{
  const data = req.body
  var label = 0;
  if(data.responseCode===200)label =0
  else if(data.responseCode===404)label =.5
  else if(data.responseCode===401)label =.8
  else  label =1
  data.label = label
  const logAdd= await webLogModel.create(data)

  res.json({result:label,message:logAdd})
})
router.post('/webService-batch', async (req,res)=>{
  const data = req.body
  var label = 0;
  const dataToTrain = {data:data}
  var resultML =''
  axios.post('http://ml.deepware.ir/api/tf/tf-test', dataToTrain)
    .then(response => {
      var resJson = response.data.result;
    for(var i=0;i<data.length;i++){
      data[i].predict=resJson[i].predict,
      data[i].resultValue=resJson[i].value 
      var rand = parseInt(Math.random()*7)
      var date = new Date()
      data[i].date = date.setDate(date.getDate() - rand);
    }
      const logAdd= webLogModel.insertMany(data)

      res.json({result:label,message:logAdd.length +" logs added",
    mlResult:resultML})
    })
    .catch(error => {
      console.error('Error sending log:', error.message);
    });
  /*if(data.responseCode===200)label =0
  else if(data.responseCode===404)label =.5
  else if(data.responseCode===401)label =.8
  else  label =1
  data.label = label*/
  
})

module.exports = router;