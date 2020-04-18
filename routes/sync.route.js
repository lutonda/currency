var express = require('express');
var router = express.Router();

var controller = require('../controllers/sync.controller');

router.get('/_io/download/international', controller.international);

router.get('/_io/download/local', controller.local);

      
module.exports = router;