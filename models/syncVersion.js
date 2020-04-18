
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const SyncVersionSchema = new mongoose.Schema({
    code: {
        type: String
    },
    version: {
        type: Number,
        default:(new Date()).getHours()
    },
    exchanges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exchange",
        autopopulate: true
    }],
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
SyncVersionSchema.plugin(require('mongoose-autopopulate'));
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
