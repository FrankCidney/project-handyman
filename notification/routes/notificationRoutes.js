const { Router } = require('express');
const notificationController = require('../controllers/notificationController');

const router = Router();

router.get('/get-requests', notificationController.get_requests_get);
router.get('/activeServices', notificationController.active_service_get);
router.get('/get-notifications', notificationController.get_notifications_get);
router.delete('/mark-as-read', notificationController.mark_as_read_delete);
router.delete('/end-active-service/:activeServiceId', notificationController.end_active_service_delete);

module.exports = router;