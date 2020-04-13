var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const ExchangeSchema = new mongoose.Schema({
  value: {
    type: Float32Array
  },
  source: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  currecny: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Currency',
    required:true
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

var Exchange = (module.exports = mongoose.model("Exchange", ExchangeSchema));

module.exports.getStations = (id)=> station.find({Exchange:id}).populate('stations')

module.exports.getByExchangename=function(email,callback){
  Exchange.findOne({email:email},callback).populate('stations')
}

module.exports.getByApiKey=function(apiKey,callback){
  Exchange.findOne({apikey:apiKey},callback).populate('stations')
}

module.exports.getById=function(id,callback){
  Exchange.findById(id,callback).populate('stations');
}

module.exports.create = function(newExchange, callback) {
      newExchange.save(callback);
};
