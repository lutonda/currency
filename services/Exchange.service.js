var User = require('../models/user');
var Station = require('../models/station');
var Currency = require('../models/currency')
var Exchange = require('../models/exchange')
var Source = require('../models/source')

var config=require('../config/config.json');

var Client = require('node-rest-client').Client;
 
var client = new Client();

exports.send = async function(data,callback) {
    
    source=await Source.findOne({code:'Fixer'})
    var exchange=null;
    var currency=null;
    client.get(source.url+source.endpoint+'?access_key='+source.access_key, function (data, response) {
        // parsed response body as js object

        Object.keys(data.rates).map(i => [data.rates[i],i]).forEach( rate=> {   
            
            currency=Currency.findOne({code:rate[1]})         
            exchange=new Exchange()
            exchange.inValue=rate[0];
            exchange.outValue=rate[0];
            exchange.source=source;
            exchange.currency=currency;
            exchange.sourcedate=data.date;
            exchange.save(x=>{
            console.log('***************************************')
                console.log(x)
            })
        });
        console.log(data);
        // raw response
        console.log(response);
    });/**/
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing     

}
exports.receive = async function(data,callback) {
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  
}