
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const SyncVersionSchema = new mongoose.Schema({
    code: {
        type: String
    },
    version: {
        type: Number,
        default:1
             /*async () => {
            try{
                console.log('--------------------------------')
                var v = await SyncVersion.findOne({},(v)=>{
                    return v = v ? v.version + 1 : 1
                });
                console.log(v)
                return  v ? v.version + 1 : 1
                console.log('--------------------------------')
                
            }catch(err){
                v=1
            }
            return v
        }*/
    },
    sourceDate: {
        type: Date
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

var SyncVersion = (module.exports = mongoose.model("SyncVersion", SyncVersionSchema));

module.exports.getStations = (id) => station.find({ SyncVersion: id }).populate('stations')

module.exports.getBySyncVersionname = function (email, callback) {
    SyncVersion.findOne({ email: email }, callback).populate('stations')
}

module.exports.getByApiKey = function (apiKey, callback) {
    SyncVersion.findOne({ apikey: apiKey }, callback).populate('stations')
}

module.exports.getById = function (id, callback) {
    SyncVersion.findById(id, callback).populate('stations');
}

module.exports.create = function (newSyncVersion, callback) {
    newSyncVersion.save(callback);
};
