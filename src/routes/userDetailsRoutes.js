const { Router } = require('express');
const userDetailsController = require('../controllers/userDetailsController');

const router = Router();

router.get('/defaultlocation', userDetailsController.default_location_get);
router.get('/details/client/:clientId', userDetailsController.details_client_get);
router.get('/details/handyman/:handymanId', userDetailsController.details_handyman_get);
router.put('/rating', userDetailsController.rating_put);

module.exports = router;