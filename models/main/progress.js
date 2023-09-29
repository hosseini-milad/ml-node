const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProgressSchema = new Schema({
    userId:  String, // String is shorthand for {type: String}
    status:   String,
    dataset:   String,
    percent:   Number,

    date:    Date
})
module.exports = mongoose.model('progress',ProgressSchema);