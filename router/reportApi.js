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
    { $sort: {"date":-1}},
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

router.get('/webService-list', async (req,res)=>{
  
    const logWebList= await webLogModel.find({})
    const totalToday={
      totalRequest:404237,
      totalUser: 154,
      totalNewClient:12,
      totalAttack:35
    }
    var weekData={
      totalBenign:[0,0,0,0,0,0,0,0],
      totalAttack:[0,0,0,0,0,0,0,0],
      total:[0,0,0,0,0,0,0,0]
    }
    try{ 
    var today=new Date()
    for(var i=0;i<logWebList.length;i++){
      const diffTime = Math.abs(logWebList[i].date - today);
      var index = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if(logWebList[i].predict==="benign")
        weekData.totalBenign[index]++
      else weekData.totalAttack[index]++
        weekData.total[index]++
    }
    res.json({result:"logWebList",weekData:weekData,
      totalToday:totalToday})
   
  }
  catch(error){
      res.status(500).json({error:error})
  }
  
})
router.post('/webService-list-report', async (req,res)=>{
  var pageSize = req.body.pageSize?req.body.pageSize:"10";
  var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
  var nowDate = new Date();

  const data={ 
    orderNo:req.body.orderNo, 
    category:req.body.category,
    predict:req.body.predict,
    customer:req.body.customer,
    brand:req.body.brand,
    dateFrom:
        req.body.dateFrom?req.body.dateFrom[0]+"/"+
        req.body.dateFrom[1]+"/"+req.body.dateFrom[2]+" "+"00:00":
        new Date().toISOString().slice(0, 10)+" 00:00",
        //new Date(nowDate.setDate(nowDate.getDate() - 1)).toISOString().slice(0, 10)+" "+"00:00",
    dateTo:
        req.body.dateTo?req.body.dateTo[0]+"/"+
        req.body.dateTo[1]+"/"+req.body.dateTo[2]+" 23:59":
        new Date().toISOString().slice(0, 10)+" 23:59",
    pageSize:pageSize
}
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
  const logWebList= await webLogModel.aggregate([
    { $match:data.predict?{predict:data.predict}:{}},
    { $match:{date:{$gte:new Date(data.dateFrom)}}},
    { $match:{date:{$lte:new Date(data.dateTo)}}},
    { $sort: {"date":-1}},

])
const filter1Report = data.customer?
logWebList.filter(item=>item&&item.cName&&
    item.cName.includes(data.customer)):logWebList;
const pageReportList = filter1Report.slice(offset,
    (parseInt(offset)+parseInt(pageSize)))  
  try{ 
  res.json({filter:pageReportList,size:logWebList.length})
 
}
catch(error){
    res.status(500).json({error:error})
}

})

module.exports = router;