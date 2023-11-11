const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ModelDetail = new Schema({
    modelID:   String,
    userId:  String, // String is shorthand for {type: String}
    status:   String, 
    type: String,
    header:   { type : Array , "default" : [] },
    weight:   { type : Array , "default" : [] },
    normWeight:   { type : Array , "default" : [] },
    
    date:    Date
})
module.exports = mongoose.model('modeldetail',ModelDetail);