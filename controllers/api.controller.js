var User = require("../models/user");
var Currency = require("../models/currency");
var Source = require("../models/source");
var SyncVersion = require("../models/syncVersion");
var Exchange = require("../models/exchange");

exports.index = function (req, res, next) {
    res.render("api", { title: "Hey", message: "Hello there!" });
};

exports.getOneBy = async function (req, res) {

    var { from, to, amount } = req.query;
    var { source, version } = req.params;
    var filter = { code: from };


    version = await SyncVersion.findOne(version ? { code: version } : {});
    var exchange=await (await Exchange.find({version:version})).filter(exchange=>exchange.source.code==source)
    
    var currency = await Currency.findOne({ code: from })
    res.status = 401
    res.json({
        status: 401,
        message: "Unknow user",
        data: exchange
    })

};

exports.getAllBy = async function (req, res) {

    var currency = await Currency.find()
    res.status = 401
    res.json({
        status: 401,
        message: "Unknow user",
        data: currency
    })

};
