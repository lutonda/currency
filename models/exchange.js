var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const ExchangeSchema = new mongoose.Schema({
  inValue: {
    type: mongoose.Decimal128
  },
  outValue: {
    type: mongoose.Decimal128
  },
  source: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Source',
    require:true,
    autopopulate: true
  },
  currency: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Currency',
    require:true,
    autopopulate: true
  },
  version:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'SyncVersion',
    autopopulate: true
  },
  log:{
    type:Array
  },
  isActive: {
    type: Boolean,
    default: true
  }
});


ExchangeSchema.plugin(require('mongoose-autopopulate'));

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
