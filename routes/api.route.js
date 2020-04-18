///api/v2/staion/validate
// Filename: api-routes.js
// Initialize express router
var router = require('express').Router();
var controller = require('../controllers/api.controller')
// Set default API response
/*router.post('/v2/staion/autehenticate', controller.stationAutehenticateByEmail);
router.post('/v2/staion/autehenticate/api', controller.stationAutehenticateByApiKey);

router.get('/v2/sendsms', controller.stationSendsms);
*/
//router.get('/v2/rates/:source/:version', controller.getAllBy);
router.get('/v2/rates/:source/:version', controller.getAllBy);
router.get('/v2/convert/:source/:version', controller.convert);
//router.get('/v2/:source/:version/all', controller.getAllBy);
/*router.get('/v2/sendsms', controller.stationSendsms);
router.get('/v2/sendsms', controller.stationSendsms);*/

// Export API routes
module.exports = router;