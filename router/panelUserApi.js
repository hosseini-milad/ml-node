const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const fs = require('fs');
const xlsx = require('node-xlsx');
const customer = require('../models/auth/customers');
const user = require('../models/auth/users');
const ParkData = require('../models/ParkData');
const ParkGroup = require('../models/ParkGroup');


router.post('/fetch-user',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var userId = req.body.userId
    try{
        const userData = await user.findOne({_id: ObjectID(userId)})
       res.json({data:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/fetch-customer',jsonParser,async (req,res)=>{
    var userId = req.body.userId
    try{
        const userData = await customer.findOne({_id: ObjectID(userId)})
       res.json({data:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-customers',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer,
        access:req.body.access,
        offset:req.body.offset,
        brand:req.body.brand
    }
        const reportList = await customer.aggregate([
            { $match:data.access?{access:data.access}:{}},
        ])
        const filter1Report = data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
       res.json({filter:orderList,size:filter1Report.length,access:accessUnique})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/list-users',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        customer:req.body.customer,
        access:req.body.access,
        offset:req.body.offset,
        brand:req.body.brand
    }
        const reportList = await user.aggregate([
            { $match:data.access?{access:data.access}:{}},
        ])
        const filter1Report = data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        const accessUnique = [...new Set(filter1Report.map((item) => item.access))];
       res.json({filter:orderList,size:filter1Report.length,access:accessUnique})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-customer',jsonParser,async (req,res)=>{
    var userId = req.body.userId
    const data={
        cName:req.body.cName,
        email:req.body.email,
        mobile:req.body.mobile,
        meli:req.body.meli,
        cCode:req.body.cCode,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        about:req.body.about,
    }
    try{
        const userData = await customer.updateOne({_id: ObjectID(userId)},
        {$set:data})
       res.json({data:userData,success:"تغییرات اعمال شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
router.post('/update-user',jsonParser,async (req,res)=>{
    var userId = req.body.userId
    const data={
        cName:req.body.cName,
        email:req.body.email,
        mobile:req.body.mobile,
        meli:req.body.meli,
        cCode:req.body.cCode,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        about:req.body.about,
    }
    try{
        const userData = await user.updateOne({_id: ObjectID(userId)},
        {$set:data})
       res.json({data:userData,success:"تغییرات اعمال شدند"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})

var storage = multer.diskStorage(
    {
        destination: '/dataset/',
        filename: function ( req, file, cb ) {
            cb( null, "Deep"+ '-' + Date.now()+ '-'+file.originalname);
        }
    }
  );
  const uploadImg = multer({ storage: storage ,
    limits: { fileSize: "5mb" }})

router.post('/upload',uploadImg.single('upload'), async(req, res, next)=>{
    const folderName = req.body.folderName?req.body.folderName:"temp"
    
        const data = (req.body.base64image)
        // to declare some path to store your converted image
        var matches = await data.match(/^data:([A-Za-z-+./]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let fileName = `ML-${Date.now().toString()+"-"+req.body.imgName}`;
   var upUrl = `/upload/${folderName}/${fileName}`
    fs.writeFileSync("."+upUrl, imageBuffer, 'utf8');
    
    const parseNow = await ParseList(upUrl)
    try{return res.send({"status":"success",url:upUrl});
    } catch (e) {
        res.send({"status":"failed",error:e});
    }
})
const ParseList=async(url)=>{
     
        const workSheetsFromFile = xlsx.parse(
            __dirname +"/../"+url);
        const groupdata = workSheetsFromFile[0].data
        const data = workSheetsFromFile[1].data
        await ParkData.deleteMany({})
        await ParkGroup.deleteMany({})

        for(var index=2;index<data.length;index++)
        {
            
            const parkAdd = await ParkData.create({
                radif:index,
                title:data[index][1],
                user:data[index][2],

                idea: data[index][3],
                subgroup: data[index][4],
                group: data[index][5],
                center:data[index][6]
            })

            try{}catch{}
        }
        for(var index=1;index<groupdata.length;index++)
        {
            
            const parkGroup = await ParkGroup.create({
                group:groupdata[index][0],
                subgroup:groupdata[index][1],
                title:groupdata[index][2],
            })
            
            try{}catch{}
        }
       return("done")
       try{}
    catch(error){
        return("fail")
    } 
}
router.post('/list-park',jsonParser,async (req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?(parseInt(req.body.offset)*parseInt(pageSize)):0;
    try{const data={
        orderNo:req.body.orderNo,
        status:req.body.status,
        group:req.body.group,
        center:req.body.center,
        subgroup:req.body.subgroup,
    }
        const reportList = await ParkData.aggregate([
            { $match:data.group?{group:data.group}:{}},
            { $match:data.subgroup?{subgroup:data.subgroup}:{}},
            { $match:data.center?{center:data.center}:{}},
            {$lookup:{
                from : "parkgroups", 
                localField: "group", 
                foreignField: "group", 
                as : "groupDetail"
            }}
        ])
        const groupList = await ParkGroup.find({subgroup:"0"})
        const subGroupList = data.group?await ParkGroup.find({group:data.group}):'';
        const filter1Report = data.customer?
        reportList.filter(item=>item&&item.cName&&
            item.cName.includes(data.customer)):reportList;
        const orderList = filter1Report.slice(offset,
            (parseInt(offset)+parseInt(pageSize)))  
        
        const parkList = [...new Set(reportList.map((item) => item.center))];
        const chartData = data.center?
        await calcChartCenter(reportList,groupList,subGroupList,
            data.center,data.group):
        await calcChart(reportList,parkList,groupList,subGroupList,data.group,data.subgroup)
        const chartSub = await calcSubGroup(reportList,subGroupList)
        const groupSubList = [...new Set(reportList.map((item) => item.subgroup))];
       res.json({filter:orderList,size:reportList.length,
        parkList:parkList,groupList:groupList,subGroupList:subGroupList,
        ...chartData,subChart:chartSub
    })
    }
    catch(error){
        res.status(500).json({message: error.message})
    } 
})
const calcChart=async(data,parkList,groupList,subGroupList,group,subgroup)=>{
    
    var chartLabel=parkList
    var groupName = group&&groupList.find(item=>item.group===group)
    var subgroupName = subgroup&&subGroupList.find(item=>item.subgroup===subgroup)
    
    var title = "نمودار " + (groupName?groupName.title:'')
    if(subgroup) title+= " - زیرگروه " + (subgroupName?subgroupName.title:'')
    var chartData=new Array(parkList.length).fill(0)
    for(var i=0;i<data.length;i++){
        for(var j=0;j<chartLabel.length;j++)
            if(chartLabel[j]&&(chartLabel[j] === data[i].center)){
                chartData[j]++
                break;
            }
    }
    return({chartLabel:chartLabel,chartData:chartData,title:title})
}
const calcChartCenter=async(data,groupList,subGroupList,center,group)=>{
    
    var chartLabel=subGroupList?subGroupList:groupList
    var chartData=new Array(chartLabel.length).fill(0)
    var title = " نمودار "+center+" - ";
    if(subGroupList) title += groupList.find(item=>item.group===group).title
    
    for(var i=0;i<data.length;i++){
        for(var j=0;j<chartLabel.length;j++)
            if(chartLabel[j]){
                if(subGroupList){
                    if(chartLabel[j].subgroup === data[i].subgroup){
                    chartData[j]++
                    break;
                    }
                }
                else if(chartLabel[j].group === data[i].group){
                    chartData[j]++
                    break;
                }
            }
    }
    return({chartLabel:chartLabel.map(item=>item.title),
        chartData:chartData,title:title})
}
const calcSubGroup=async(data,subgroup)=>{
    var totalSub = await ParkGroup.find({})
    var title = "نمودار زیرگروه ها"
    var subgroupTemp = totalSub
    var chartData=new Array(subgroupTemp.length).fill(0)
    for(var i=0;i<data.length;i++){
        for(var j=0;j<subgroupTemp.length;j++)
            if(subgroupTemp[j])
                if(subgroupTemp[j].group === data[i].group&&
                    subgroupTemp[j].subgroup === data[i].subgroup ){
                    chartData[j]++
                break;
            }
    }
    return({subChartData:chartData,subChartLabel:subgroupTemp.map(item=>item.title)})
}
module.exports = router;