const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const WebLogSchema = new Schema({
    url: String,
    host: String,
    agent: String,
    requestLength: String,
    query: Object,
    requestSize: Number,
    responseCode: Number,
    responseTime: Number,
    remoteIp: String,

    predict: String,
    resultValue:String,
    date: { type: Date , default: Date.now }   
})
module.exports = mongoose.model('weblog',WebLogSchema);