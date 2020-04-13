var User = require('../models/user');
var Station = require('../models/station');

var config=require('../config/config.json');

var Client = require('node-rest-client').Client;
 
var client = new Client();

exports.send = async function(data,callback) {
  
console.log(config.sources[0].url)
console.log(config.sources[0].endpoint)
console.log(config.sources[0].access_key)
console.log('----------------------------------------------')
    /*client.get("http://remote.site/rest/xml/method", function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });*/
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing     

}
exports.receive = async function(data,callback) {
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  
}