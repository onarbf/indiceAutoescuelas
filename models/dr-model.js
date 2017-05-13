var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var drSchema =  new Schema({
  name : { type: String},
  location : { type : String},
  tlf: {type: String},
  email : {type: String},
  admin: {type: String},
  logs : {type: String},
  note : {type: String},
  deleted : {type: Boolean},
  colorline : {type: String}
})


var drModel = mongoose.model('autoescuela', drSchema);

module.exports = drModel;
