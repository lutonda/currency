var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const CurrencySchema = new mongoose.Schema({
  name: {
    type: String
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  source: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Currency = (module.exports = mongoose.model("Currency", CurrencySchema));

module.exports.getStations = (id)=> station.find({Currency:id}).populate('stations')

module.exports.getByCurrencyname=function(email,callback){
  Currency.findOne({email:email},callback).populate('stations')
}

module.exports.getByApiKey=function(apiKey,callback){
  Currency.findOne({apikey:apiKey},callback).populate('stations')
}

module.exports.getById=function(id,callback){
  Currency.findById(id,callback).populate('stations');
}

module.exports.create = function(newCurrency, callback) {
  newCurrency.save(callback);
};

