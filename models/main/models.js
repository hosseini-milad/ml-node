const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ModelSchema = new Schema({
    userFolder:   String,
    userId:  String, // String is shorthand for {type: String}
    status:   String, 
    name:   String,
    desription:   String,
    dataset:   String,
    datasetUrl:   String,
    trainData:   String,
    trainUrl:   String,

    date:    Date
})
module.exports = mongoose.model('Models',ModelSchema);