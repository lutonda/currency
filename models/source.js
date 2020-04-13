var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const SourceSchema = new mongoose.Schema({
  code: {
    type: String
  },
  name: {
    type: String
  },
  url: {
    type: String
  },
  htmlSelector: {
    type: String
  },
  descriptions: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Source = (module.exports = mongoose.model("Source", SourceSchema));

module.exports.getStations = (id)=> station.find({Source:id}).populate('stations')

module.exports.getBySourcename=function(email,callback){
  Source.findOne({email:email},callback).populate('stations')
}

module.exports.getByApiKey=function(apiKey,callback){
  Source.findOne({apikey:apiKey},callback).populate('stations')
}

module.exports.getById=function(id,callback){
  Source.findById(id,callback).populate('stations');
}

module.exports.create = function(newSource, callback) {
      newSource.save(callback);
};
