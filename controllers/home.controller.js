var  ExchangeService = require("../services/Exchange.service");
exports.index = function(req, res) {

    ExchangeService.interncional('test',()=>{})
    ExchangeService.local('test',()=>{})
    res.render('home/index')
  };
  
exports.api =  function(req, res) {

    
        res.render('home/api')
}
  
exports.about =  function(req, res) {
        res.render('home/about')
}
    
exports.project =  function(req, res) {
        res.render('home/project')
}