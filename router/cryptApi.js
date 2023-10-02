const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
var rsa = require("node-bignumber");

router.post('/rsaME', async (req,res)=>{

  var n = req.body.modulus;
  var e = req.body.exponent;
  var pub = new rsa.Key();
  pub.setPublic(n, e);
  var message = req.body.sessionID+"**"+req.body.password;
  var encrypted = pub.encrypt(message);

  res.json((encrypted))
})

module.exports = router;