var User = require("../models/user");
var Currency = require("../models/currency");
var Source = require("../models/source");
var SyncVersion = require("../models/syncVersion");
var Exchange = require("../models/exchange");

exports.index = function (req, res, next) {
    res.render("api", { title: "Hey", message: "Hello there!" });
};

exports.getOneBy = async function (req, res) {

    var { source, version } = req.params;
    var filter = version ? { code: version } : {};


    version = await SyncVersion.findOne(filter);
    var exchanges = await (await Exchange.find({ version: version })).filter(exchange => exchange.source.code == source).map(exchange => {
        return {
            date: exchange.date,
            value: exchange.inValue,
            code: exchange.currency.code,
            name: exchange.currency.name,
            description: exchange.currency.description
        }
    })

    res.status = 401
    res.json({
        status: 401,
        message: "Unknow user",
        data: {
            exchanges: exchanges,
            source: source,
            date: version.date,
            version: 'latest'
        }
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
