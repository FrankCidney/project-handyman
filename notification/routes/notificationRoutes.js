const { Router } = require('express');
const notificationController = require('../controllers/notificationController');

const router = Router();

router.get('/get-requests', notificationController.get_requests_get);
router.get('/activeServices', notificationController.active_service_get);

module.exports = router;