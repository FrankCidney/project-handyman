const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup/client', authController.signup_client_post);
router.post('/signup/handyman', authController.signup_handyman_post);
router.post('/signin/client', authController.signin_client_post);
router.post('/signin/handyman', authController.signin_handyman_post);

module.exports = router;