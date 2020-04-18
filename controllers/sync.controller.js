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

    ExchangeService.local(req,res, data => { 
        res.json({code:'ok',data:data})
    })
    
}

exports.project = function (req, res) {
    res.render('home/project')
}