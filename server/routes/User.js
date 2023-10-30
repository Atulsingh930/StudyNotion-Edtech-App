const express = require('express');
const router = express.Router();

const {sendOtp, signUp, login, changePassword} = require('../controllers/Auth');
const {auth} = require('../middleware/auth');
const { contactUs } = require('../controllers/ContactUs');

router.post('/sendotp', sendOtp);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/changePassword', auth, changePassword);
router.post('/contact-us-feedback', contactUs)
// router.put('/verify-token', auth);

module.exports = router;