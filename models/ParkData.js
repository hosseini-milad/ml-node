const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ParkDataSchema = new Schema({
    radif: {type:Number, unique: true},
    title:String,
    user:String,

    idea: String,
    subgroup: String,
    group: String,
    center: String,
    
})
module.exports = mongoose.model('parkdata',ParkDataSchema);