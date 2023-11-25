const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const models = require('../models/main/models');
const modelDetail = require('../models/main/modelDetail');
var ObjectID = require('mongodb').ObjectID;


router.post('/find',jsonParser,async (req,res)=>{
    try{
        const modelData = await models.findOne({modelId:req.body.modelId});
        res.json(modelData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/find-detail',jsonParser,async (req,res)=>{
    try{
        const modelData = await modelDetail.findOne({modelId:req.body.modelId});
        res.json(modelData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 

router.post('/list',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    var nowDate = new Date();
    try{
    const modelList = await models.aggregate([
        {$addFields: { "user_Id": { $toObjectId: "$userId" }}},
        {$lookup:{
            from : "users", 
            localField: "user_Id", 
            foreignField: "_id", 
            as : "userInfo"
        }},
        { $match:req.body.userId?{userId:ObjectID(req.body.userId)}:{}},
    ])
        
       res.json({filter:modelList})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

module.exports = router;