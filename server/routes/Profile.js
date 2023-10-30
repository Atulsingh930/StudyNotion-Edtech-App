const express = require('express');
const router = express.Router();

const {resetPassword, resetPasswordToken} = require('../controllers/resetPassword');
const {updateProfile, deleteAccount, updateProfilePicture, getUserDetails, getEnrolledCourse} = require('../controllers/Profile');
const {auth, isStudent} = require('../middleware/auth');

router.post('/resetPassword', resetPassword);
router.post('/resetPasswordToken', resetPasswordToken);
router.put('/updateProfile', auth, updateProfile);
router.put('/updateProfilePicture', auth, updateProfilePicture);
router.get('/getUserDetails', auth, getUserDetails);
router.delete('/deleteAccount', auth, deleteAccount);
router.get('/getEnrolledCourse', auth, isStudent, getEnrolledCourse)

module.exports = router;
