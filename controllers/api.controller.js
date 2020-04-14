var User = require("../models/user");
var Currency = require("../models/currency");

exports.index = function (req, res, next) {
    res.render("api", { title: "Hey", message: "Hello there!" });
};

exports.getOneBy = async function (req, res) {

    var { from, to, amount, source, version } = req.query;
    
    var currency = await Currency.findOne({ code: from })
    res.status = 401
        res.json({
            status: 401,
            message: "Unknow user",
            data: currency
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
