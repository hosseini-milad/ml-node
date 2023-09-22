const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String, required : true},
  sName:{ type: String, required : true},
  phone: { type: String , required : true},
  password: { type: String },
  meliCode: { type: String },
  email: { type: String , unique: true},
  
  access:{
    type:String,
    enum:["manager","tester","seo","customer","request"]
  },
  group: { type:String },
  token: { type: String },
  otp:{ type: String , default: null },
  active:{ type: Boolean , default: false },
  status:{ type: String },
  Code:{ type: String },

  date:{type:Date}
});

module.exports = mongoose.model("user", userSchema);