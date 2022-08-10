const { Router } = require('express');
const paymentController = require('../controllers/paymentController');
const { getAccessToken } = require('../middleware/middleware');
const { requireAuth } = require('../../src/middleware/authMiddleware');
require('dotenv').config();

const router = Router();

// lipa na mpesa routes, for payment to app
router.post('/mpesa-express-request', requireAuth, getAccessToken, paymentController.mpesa_express_request);
router.post('/stk-result', paymentController.stk_result);

// b2c routes, for payment to handyman
router.get('/b2c/request', getAccessToken, paymentController.b2c_request);
router.post('/b2c/timeout', paymentController.b2c_timeout);
router.post('/b2c/result', paymentController.b2c_result);

module.exports = router;