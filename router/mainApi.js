const express = require('express');
const router = express.Router()
const fs = require("fs");
const mime = require('mime');
const multer = require('multer');
const { parse } = require("csv-parse");
const authApi = require('./authApi');
const modelApi = require('./modelApi');
const deepApi = require('./mlApi');
const reportApi = require('./reportApi')
const fetchApi = require('./fetchApi');
const cryptApi = require('./cryptApi');
const panelUserApi = require('./panelUserApi')
const panelModelApi = require('./panelModelApi')
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectId;
const decompress = require("decompress");
const csv = require("fast-csv");
const users = require('../models/auth/users');

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


router.use('/auth', authApi)
router.use('/model', modelApi)
router.use('/deep', deepApi)
router.use('/fetch', fetchApi)
router.use('/report', reportApi)
router.use('/crypt', cryptApi)
router.use('/panel/user', panelUserApi)
router.use('/panel/model', panelModelApi)
router.post('/upload',uploadImg.single('upload'),auth,async (req,res)=>{
  try{
      const userData = await users.findOne({_id:new ObjectID(req.headers['userid'])})
      if(!userData){
        res.status(500).json({error:"user not found!"})
        return
      }
    var userFolder = userData.username
      var matches = await req.body.data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      
      response = {};
      //console.log(matches)
      if (matches.length !== 3) {
      return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = Buffer.from(matches[2], 'base64');
      //console.log(matches[1])
        var csvPath = ''
      let decodedImg = response;
      let imageBuffer = decodedImg.data;
      let type = decodedImg.type;
      let extension = mime.extension(type);
      let fileName = `Deep-${Date.now().toString()+"-"+req.body.imgName}.deep`//${extension}`;
      try {
        if (!fs.existsSync(`./dataset/${userFolder}`)){
          fs.mkdirSync(`./dataset/${userFolder}`, { recursive: true });
        }
      fs.writeFileSync(`./dataset/${userFolder}/` + fileName, imageBuffer, 'utf8');
      const decFile = await decompress(`./dataset/${userFolder}/`+fileName)
      .then((files) => {
        response.type = files[0].type;
        response.data = Buffer.from(files[0].data, 'base64');
        //console.log(matches[1])f
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        csvPath = `./dataset/${userFolder}/` + files[0].path
        fs.writeFileSync(csvPath, imageBuffer, 'utf8');
      })
      .catch((error) => {
        console.log(error);
      });
      //console.log("write")
      return res.send({message:"upload Done",
          url:csvPath});
      } catch (e) {
          res.send({"status":"failed",error:e});
      }
      //res.json({message:"upload Done"})
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/upload-csv',async (req,res)=>{
  var csvData = {}
    var CSV_STRING = req.body
    csv.fromString(CSV_STRING, {
        headers: ["count", "value"],
        ignoreEmpty: true,
    })
        .on("data", function (data) {
            csvData[data.value] = data
        })
        .on("end", function () {
            console.log(csvData)
            //make call to database
            res.send("Done")
        })
})

router.get('/test', async (req,res)=>{
  res.status(200).json({output: parseFloat("192.168.1.1")})
})

module.exports = router;