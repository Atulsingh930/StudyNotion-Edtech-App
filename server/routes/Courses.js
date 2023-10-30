const express = require('express');
const router = express.Router();

const {createCourse,editCourse, showAllACourses, getCourseDetails, deleteCourse, publishCourses, getInstructorCourse, removeCourseFromUser, updateCourseProgress, getFullCourseDetails, getInstructorDetails} = require('../controllers/Course');
const {createSection, updateSection, deleteSection} = require('../controllers/Section');
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/SubSection');
const {createRatingAndReview, getAverageRating, getAllRatingAndReview, getUserRating, updateRatingAndReview, deleteRatingReview, getCourseRatingAndReview} = require('../controllers/RatingAndReview');
const {createcategory, fetchAllcategory, categoryPageDetails} = require('../controllers/Category');
const {auth, isStudent, isInstructor, isAdmin} = require('../middleware/auth');

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post('/createCourse', auth, isInstructor, createCourse);
router.get('/showAllCourses', showAllACourses);
router.post("/editCourse", auth, isInstructor, editCourse)
router.post('/getCourseDetails', getCourseDetails);
router.post('/getFullCourseDetails', auth, isStudent, getFullCourseDetails);
router.delete('/deleteCourse', auth, isInstructor, deleteCourse);
router.post('/publishCourse', auth, isInstructor, publishCourses)
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourse);
router.post('/removeCourseFromUser', auth, isStudent, removeCourseFromUser);
router.post('/updateCourseProgress', auth, isStudent, updateCourseProgress);
router.post('/getInstructorDetails', auth, isInstructor, getInstructorDetails);

// ********************************************************************************************************
//                                      Section routes
// ********************************************************************************************************

router.post('/createSection', auth, isInstructor, createSection);
router.post('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);

// ********************************************************************************************************
//                                      SubSection routes
// ********************************************************************************************************

router.post('/createSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);

// ********************************************************************************************************
//                                      Raying and Review routes
// ********************************************************************************************************

router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview);
router.post('/updateRatingAndReview', auth, isStudent, updateRatingAndReview);
router.post('/deleteRatingReview', auth, isStudent, deleteRatingReview);
router.post('/getUserRating', auth, isStudent, getUserRating);
router.post('/getAverageRating', getAverageRating);
router.get('/getAllRatingAndReview', getAllRatingAndReview);
router.post('/getCourseRatingAndReview', getCourseRatingAndReview);

// ********************************************************************************************************//
//                                      Category routes
// ********************************************************************************************************//

router.post('/createcategory', auth, isAdmin, createcategory);
router.get('/fetchAllcategory', fetchAllcategory);
router.post('/categoryPageDetails', categoryPageDetails);

module.exports = router;