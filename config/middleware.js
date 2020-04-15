let jwt = require('jsonwebtoken');
const config = require('./app.json');
var fs = require('fs')
const privateKey = fs.readFileSync('./config/private.key');

let checkToken = (req, res, next) => {

  res.set('Content-Type', 'application/json')
  
  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['x-api-key'] || ''; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, privateKey, config.verifyOptions, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
          data: decoded
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}