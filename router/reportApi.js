const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const axios = require('axios');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router()
const jsonParser = bodyParser.json();
const webLogModel = require('../models/Log/webLogModel');


router.post('/web-list',jsonParser, async (req,res)=>{
  
    const data={
      predict:req.body.predict,
    dateFrom:
            req.body.dateFrom?req.body.dateFrom[0]+"/"+
            req.body.dateFrom[1]+"/"+req.body.dateFrom[2]+" "+"00:00":
            new Date().toISOString().slice(0, 10)+" 00:00",
            //new Date(nowDate.setDate(nowDate.getDate() - 1)).toISOString().slice(0, 10)+" "+"00:00",
    dateTo:
            req.body.dateTo?req.body.dateTo[0]+"/"+
            req.body.dateTo[1]+"/"+req.body.dateTo[2]+" 23:59":
            new Date().toISOString().slice(0, 10)+" 23:59",
  }
  var nowDate = new Date();
  const nowIso=nowDate.toISOString();
    ////console.log(nowIso)
    const nowParse = Date.parse(nowIso);
    const now = new Date(nowParse)
    var now2 = new Date();
    var now3 = new Date();

    const dateFromEn = new Date(now2.setDate(now.getDate()-(data.dateFrom?data.dateFrom:1)));
    
    dateFromEn.setHours(0, 0, 0, 0)
    const dateToEn = new Date(now3.setDate(now.getDate()-(data.dateTo?data.dateTo:0)));
    
    dateToEn.setHours(23, 59, 0, 0)


  const logList= await webLogModel.aggregate([
    {$match:data.predict?{predict:data.predict}:{}},
    { $match:data.dateFrom?{date:{$gte:new Date(data.dateFrom)}}:{}},
    { $match:data.dateTo?{date:{$lte:new Date(data.dateTo)}}:{}},
  ]
        
  )
try{
  res.json({result:"log list",message:logList})
}catch(error){
  res.status(500).json({error:error})
}
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