var ExchangeService = require("../services/Exchange.service");
exports.index = function (req, res) {

    res.render('home/index')
};

exports.international = function (req, res) {

    ExchangeService.international('test', () => { 
        res.json({
            success:true
        })
    })
}

exports.local = function (req, res) {

    ExchangeService.local('test', () => { })
    res.render('home/about')
}

exports.project = function (req, res) {
    res.render('home/project')
}