const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const WebDataSchema = new Schema({
    data: Object,
    parse:Boolean,
    user:String,

    url: String,
    host: String,
    agent: String,
    requestLength: String,
    query: Object,
    requestSize: Number,
    responseCode: Number,
    responseTime: Number,
    requestToken: Number,
    remoteIp: String,
    body: Object,

    bad_body: String,
    bad_query: String,

    predict: String,
    resultValue:String,
    date: { type: Date , default: Date.now }  ,
    label:String
})
module.exports = mongoose.model('webdata',WebDataSchema);