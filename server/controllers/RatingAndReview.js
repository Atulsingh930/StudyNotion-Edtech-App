const RatingAndReview = require('../models/RatingAndReview');
const Courses = require('../models/Courses');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');

// create a rating and review controller
exports.createRatingAndReview = async(req, res)=>{
    try{
        // fetch userId and courseId, rating form body
        const {courseId, rating, review} = req.body;
        const userId = req.user.id;
        // validate the data
        if(!courseId || !rating){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }
        // check courseId and validate
        const courseDetails = await Courses.findById(courseId);
        if(!courseDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Course id is invalid, course doesn't exist"
                }
            )
        }
        // check if user is enrolled or not
        const user_id = new mongoose.Types.ObjectId(userId);
        if(!courseDetails.studentsEnrolled.includes(user_id)){
            return res.status(404).json(
                {
                    success : false,
                    message : "User is not enrooled in the course"
                }
            )
        }
        // check if user has already rated or review the course
        const checkRatingAndReview = await RatingAndReview.findOne({user : userId, course : courseId});
        if(checkRatingAndReview){
            return res.status(200).json(
                {
                    success : true,
                    message : "Maximum limit for rating and review has achived not allowed further"
                }
            )
        }
        // create a rating review in collection
        const ratingReview = await RatingAndReview.create(
            {
                rating,
                review : review ? review : null,
                course : courseDetails._id,
                user : user_id
            }
        )
        if(!ratingReview){
            return res.status(404).json(
                {
                    success : false,
                    message : "Error while createing rating abd review"
                }
            )
        }
        // update the array of ratingandreview in course collection
        const updateCourse = await Courses.findByIdAndUpdate(
            courseId,
            {$push : {ratingAndReview : ratingReview._id}},
            {new : true}
        )

        return res.status(200).json(
            {
                success : true,
                message : "Rating and Review has added successfully",
                data : ratingReview
            }
        )

    }catch(error){
        console.log("Error while crating rating and review", error)
        return res.status(500).json(
            {
                success : false,
                message : "fail to create a rating and review",
                error : error.message,
            }
        )
    }
}

exports.updateRatingAndReview = async (req, res)=>{
    try{
        // fetch userId and courseId, rating form body
        const {courseId, ratingAndReviewID, rating, review} = req.body;
        const userId = req.user.id;
        // validate the data
        if(!courseId || !ratingAndReviewID){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }
        // check if user is enrolled or not
        const user_id = new mongoose.Types.ObjectId(userId);
        const course_id = new mongoose.Types.ObjectId(courseId);
        // check if user has already rated or review the course
        const ratingAndReviewDetails = await RatingAndReview.findById(ratingAndReviewID);
        if(!ratingAndReviewDetails){
            return res.status(200).json(
                {
                    success : true,
                    message : "Rating and Review doesn't exist"
                }
            )
        }
        if(!ratingAndReviewDetails.course.equals(course_id) || !ratingAndReviewDetails.user.equals(user_id)){
            return res.status(500).json(
                {
                    success : false,
                    message : "Either the data is wrong or you are not allowed to update"
                }
            )
        }
        
        ratingAndReviewDetails.rating = rating ? rating : ratingAndReviewDetails.rating
        ratingAndReviewDetails.review = review ? review : ratingAndReviewDetails.review
        ratingAndReviewDetails.save();

        return res.status(200).json(
            {
                success : true,
                message : "Rating and Review has added successfully",
                data : ratingAndReviewDetails
            }
        )

    }catch(error){
        console.log("Error while Updateing rating and review", error)
        return res.status(500).json(
            {
                success : false,
                message : "fail to Update a rating and review",
                error : error.message,
            }
        )
    }
}

// geting average rating of course
exports.getAverageRating = async (req, res)=>{
    try{
        // fetching courseId from body
        const courseId = req.body.courseId;
        // geting average rating from rating and review array
        const result = await RatingAndReview.aggregate([
            {
              $match: { course: new mongoose.Types.ObjectId(courseId) }
            },
            {
              $group: {
                _id: null,
                averageRating: { $avg: "$rating" } // Use "$rating" to refer to the "rating" field in documents
              }
            }
          ]);
          
        // console.log(result)
        if(result.length > 0){
            return res.status(200).json(
                {
                    success : true,
                    averageRating : result[0].averageRating
                }
            )
        }
        return res.status(200).json(
            {
                success : true,
                message : "No rating and review are avilable",
                averageRating : 0
            }
        )

    }catch(error){
        console.log("Error while taking avrage of rating")
        return res.status(500).json(
            {
                success : false,
                message : "fail to taking avrage of rating",
                error : error.message,
            }
        )
    }
}

// get all review and rating in database
exports.getAllRatingAndReview = async (req, res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({ rating: "desc" })
        .populate(
            {
                path : "user",
                select : "firstName lastName email userImage"
            }
        )
        .populate(
            {
                path : "course",
                select : "courseName"
            }
        ).exec();

        return res.status(200).json(
            {
                success : true,
                data : allReviews,
                message : "All rating and review are fetched successfully"
            }
        )
    }catch(error){
        console.log("Error while fetching all of the rating and review")
        console.log(error)
        return res.status(500).json(
            {
                success : true,
                message : "fail to fetch all of the rating and review",
                error : error.message
            }
        )
    }
}

exports.getCourseRatingAndReview = async (req, res)=>{
    try{
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }
        const allCourseReviews = await RatingAndReview.find(
            {
                course : courseId
            }
        )
        .sort({ rating: "desc" })
        .populate(
            {
                path : "user",
                select : "firstName lastName email userImage"
            }
        )
        .populate(
            {
                path : "course",
                select : "courseName"
            }
        ).exec();

        if(!allCourseReviews){
            return res.status(400).json(
                {
                    success : false,
                    message : "Error while fetching Course Rating"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                data : allCourseReviews,
                message : "All rating and review are fetched successfully"
            }
        )
        
    }catch(error){
        console.log("Error while fetching the rating and review of Course")
        return res.status(500).json(
            {
                success : false,
                message : "Error while fetching the rating and review of Course",
                error : error.message
            }
        )
    }
}

exports.getUserRating = async (req, res)=>{
    try{
        const {courseId} = req.body;
        const userID = req.user.id;

        if(!courseId){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }

        const ratingAndReview = await RatingAndReview.findOne(
            {
                user : userID,
                course : courseId
            }
        )

        if(!ratingAndReview){
            return res.status(200).json(
                {
                    success : false,
                    message : "Rating and Review not found"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : 'Successfull fetch the user rating and review',
                data : ratingAndReview
            }
        )
    }catch(error){
        console.log("Error while fetching the rating and review of User")
        return res.status(500).json(
            {
                success : false,
                message : "Error while fetching the rating and review of User",
                error : error.message
            }
        )
    }
}

exports.deleteRatingReview = async (req, res)=>{
    try{
        const {ratingAndReviewID} = req.body;
        if(!ratingAndReviewID){
            return res.status(400).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }
        const ratingAndReviewDetails = await RatingAndReview.findById(ratingAndReviewID);
        const updatedCourseDetails = await Courses.findByIdAndUpdate(
            {_id : ratingAndReviewDetails.course},
            {
                $pull : {
                    ratingAndReview : ratingAndReviewDetails._id
                }
            }
        )

        ratingAndReviewDetails.deleteOne();
        return res.status(200).json(
            {
                success : true,
                message : "rating and review delete successfully"
            }
        )
        
    }catch(error){
        console.log("Error while deleting the rating and review")
        return res.status(500).json(
            {
                success : false,
                message : "Error while deleting the rating and review",
                error : error.message
            }
        )
    }
}