const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ModelSchema = new Schema({
    userFolder:   String,
    userId:  String, // String is shorthand for {type: String}
    status:   String, 
    type: String,
    name:   String,
    desription:   String,
    dataset:   String,
    datasetUrl:   String,
    dataRecord: Number,
    dataColumn: Number,
    trainData:   String,
    trainUrl:   String,

    date:    Date
})
module.exports = mongoose.model('Models',ModelSchema);