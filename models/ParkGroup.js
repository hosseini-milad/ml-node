const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ParkGroupSchema = new Schema({
    group:String,
    subgroup:String,
    title:String,
    
})
module.exports = mongoose.model('parkgroup',ParkGroupSchema);