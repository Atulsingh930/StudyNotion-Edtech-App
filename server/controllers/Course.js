const User = require('../models/User');
const Category = require('../models/Category');
const { uploadFileToCloudinary } = require('../utils/fileUploader');
const Courses = require('../models/Courses');
const { default: mongoose, Mongoose } = require('mongoose');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
const RatingAndReview = require('../models/RatingAndReview');
require('dotenv').config();

exports.createCourse = async (req, res)=>{
    try{
        // Fetch the data from body and file
        let {courseName, courseDescription, WhatYouWillLearn, price, category, tag, instructions} = req.body;
        const thumbnail = req.files.thumbnailImage;
        // validate the data
        if(!courseName || !courseDescription || !WhatYouWillLearn || !price || !category || !thumbnail || !tag || !instructions){
            return res.status(404).json(
                {
                    success : false,
                    message : "All fields are requiered"
                }
            )
        }
        // fetch user id from req.user which was paresed during autheroztion
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        // check if user exist or not
        if(!instructorDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Instructor Details not found"
                }
            )
        }
        // fetching category detail to check if category exist or not
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "category Details not found"
                }
            )
        }
        // uploading image to cloudinary
        tag = tag.length>1?tag:tag.split(',');
        instructions = instructions.length>1?instructions:instructions.split(',');
        const thumbnailImageUploader = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
        // creating new course in database
        const newCourse = await Courses.create(
            {
                courseName,
                courseDescription,
                WhatYouWillLearn,
                price,
                category,
                instructor : instructorDetails._id,
                thumbnail : thumbnailImageUploader.secure_url,
                tag : [...tag.split(',')],
                instructions : [...instructions.split(',')],
                status : 'Draft'
            }
        )
        // Updating array of courses in user
        await User.findOneAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id
                }
            },
            {new : true}
        )
        // Updating array of courses in category
        await Category.findOneAndUpdate(
            {_id : category},
            {
                $push : {
                    courses : newCourse._id
                }
            },
            {new : true}
        )
        return res.status(200).json(
            {
                success : true,
                message : "New course has been created",
                data : newCourse,
            }
        )
    }catch(error){
        console.log("Error while creating course")
        return res.status(500).json(
            {
                success : false,
                message : "fail to create a course",
                error : error.message,
            }
        )
    }
}

exports.editCourse = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const updates = req.body
	  const course = await Courses.findById(courseId)
  
	  if (!course) {
		return res.status(404).json({ error: "Course not found" })
	  }
  
	  // If Thumbnail Image is found, update it
	  if (req.files) {
		const thumbnail = req.files.thumbnail
		const thumbnailImage = await uploadFileToCloudinary(
		  thumbnail,
		  process.env.FOLDER_NAME
		)
        if(thumbnailImage){
            course.thumbnail = thumbnailImage?.secure_url
        }
	  }
      const prevID = new mongoose.Types.ObjectId(updates.category);
      if(course.category!==prevID){
          const prevCategory = await Category.findByIdAndUpdate(
              {_id : course.category},
              {
                  $pull : {
                      courses : course._id
                  }
              }
          )
          const currentCategory = await Category.findByIdAndUpdate(
              {_id : prevID},
              {
                  $push : {
                      courses : course._id
                  }
              }
          )
          if(!prevCategory || !currentCategory){
              return res.status(404).json(
                  {
                      success : false,
                      message : 'Error while updateing the category'
                  }
              )
          }
      }
	  // Update only the fields that are present in the request body
	  for (const key in updates) {
		if (updates.hasOwnProperty(key)) {
		  if (key === "tag" || key === "instructions") {
			course[key] = [...updates[key].split(',')]
		  } else {
			course[key] = updates[key]
		  }
		}
	  }
  
	  await course.save()
  
	  const updatedCourse = await Courses.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
          populate : {
            path : "courses"
          }
		})
		.populate("category")
		.populate({path:"courseContent",populate:{path:"subSection"}})
		.exec()
  
	  res.json({
		success: true,
		message: "Course updated successfully",
		data: updatedCourse,
	  })
	} catch (error) {
	  console.error(error)
	  res.status(500).json({
		success: false,
		message: "Internal server error",
		error: error.message,
	  })
	}
}

// getting all courses
exports.showAllACourses = async (req, res)=>{
    try{
        // Fetch all course with some condition and populate instructor
        const allCourse = await Courses.find(
            {},
            {
                courseName : true,
                courseDescription : true,
                price : true,
                WhatYouWillLearn : true,
                ratingAndReview : true,
                thumbnail : true,
                instructor : true,
                studentsEnrolled : true
            }
        ).populate("instructor").exec()
        return res.status(200).json(
            {
                success : true,
                message : "Fetched all courses successfull",
                data : allCourse
            }
        )
    }catch(error){
        console.log("Error while fetching course")
        return res.status(500).json(
            {
                success : false,
                message : "fail to fetch a course",
                error : error.message,
            }
        )
    }
}

// get all courses in response and replace all ref with actual data
exports.getCourseDetails = async (req, res)=>{
    try{
        const {courseID} = req.body;
        // ftching data using courseId
        if(!courseID){
            return res.status(404).json(
                {
                    success : false,
                    message : "CourseID is not defined",

                }
            )
        }
        const courseDetails = await Courses.findById(courseID)
        .populate({path : "instructor",populate : {path : "additionalDetails"}})
        .populate("category")
        .populate({path:"courseContent",populate:{path:"subSection"}})
        .populate('ratingAndReview')
        .exec();

        if(!courseDetails){
            return res.status(400).json(
                {
                    success : false,
                    message : error.message
                }
            )
        }
        return res.status(200).json(
            {
                success : true,
                data : courseDetails,
                message : "Data has been fetched successfully"
            }
        )
    }catch(error){
        console.log("Error while fetching courseDetails")
        console.log(error);
        return res.status(500).json(
            {
                success : false,
                message : "fail to fetch a courseDetails",
                error : error.message,
            }
        )
    }
}

exports.deleteCourse = async (req, res)=>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        
        if(!courseId){
            return res.status(404).json(
                {
                    success : false,
                    message : 'All feilds are requiered'
                }
            )
        }

        
        const coursedetails = await Courses.findById(courseId);
        if(coursedetails.courseContent.length>0){
            const sectionIDs = coursedetails.courseContent;
            console.log(sectionIDs)
            if(sectionIDs.length>0){
                const subsectionIDs = []
                for(const sectionID of sectionIDs){
                    console.log(sectionID)
                    const section = await Section.findById(sectionID);
                    console.log(section)
                    subsectionIDs.push(...section.subSection);
                }
                await SubSection.deleteMany({_id : {$in : subsectionIDs}})
            }
            await Section.deleteMany({_id : {$in : sectionIDs}})
        }
        if(!coursedetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'courses does not found'
                }
                )
            }
            if(!coursedetails.instructor._id.equals(userId)){
                return res.status(401).json(
                    {
                    success : false,
                    message : 'User not allowed to remove course'
                }
                )
            }
        // Unenrolling the studenets
        coursedetails.studentsEnrolled.map(async (studentID)=>{
            await User.findByIdAndUpdate(
                {studentID},
                {
                    $pull : {
                        courses : coursedetails._id
                    }
                }
            )
        })

        const deleteDetail = await Courses.findByIdAndDelete(courseId);

        const updateInstructor = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    courses: courseId
                }
            },
            { new: true })

        const updateCategory = await Category.findByIdAndUpdate(
            coursedetails.category,
            {
                $pull: {
                    courses: courseId
                }
            },
            { new: true })
        return res.status(200).json(
            {
                success : true,
                message : 'Course delete successfully',
                data : deleteDetail
            }
        )
    }catch(error){
        console.log(error)
        console.log("Error while deleting course")
        return res.status(500).json(
            {
                success : false,
                message : "fail to delete a course",
                error : error.message,
            }
        )
    }
}

exports.getFullCourseDetails = async (req, res)=>{
    try{
        const {courseID} = req.body;
        const userID = req.user.id
        // ftching data using courseId
        if(!courseID){
            return res.status(404).json(
                {
                    success : false,
                    message : "CourseID is not defined",

                }
            )
        }
        const courseDetails = await Courses.findById(courseID)
        .populate({path : "instructor",populate : {path : "additionalDetails"}})
        .populate("category")
        .populate({path:"courseContent",populate:{path:"subSection"}})
        .exec();

        if(!courseDetails){
            return res.status(400).json(
                {
                    success : false,
                    message : error.message
                }
            )
        }
        const courseProgressDetails = await CourseProgress.findOne(
            {
                courseId : courseDetails._id,
                userID : userID
            }
        )

        if(!courseProgressDetails){
            return res.status(400).json(
                {
                    success : false,
                    message : 'Error while fetching CourseProgress'
                }
            )
        }
        return res.status(200).json(
            {
                success : true,
                data : {
                    courseDetails,
                    courseProgressDetails
                },
                message : "Data has been fetched successfully"
            }
        )
    }catch(error){
        console.log("Error while fetching courseDetails")
        console.log(error);
        return res.status(500).json(
            {
                success : false,
                message : "fail to fetch a courseDetails",
                error : error.message,
            }
        )
    }
}

exports.publishCourses = async (req, res)=>{
    try{
        const {courseID, status} = req.body;
        const userID = req.user.id;

        if(!courseID){
            return res.status(404).json(
                {
                    success : false,
                    message : 'All fields are required'
                }
            )
        }
        const courseDetails = await Courses.findById(courseID);
        if(!courseDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'Course is not found'
                }
            )
        }
        if(courseDetails.instructor === new mongoose.Types.ObjectId(userID)){
            return res.status(401).json(
                {
                    success : false,
                    message : 'User not allowed to make changes in course'
                }
            )
        }

        courseDetails.status = status;
        courseDetails.save();

        return res.status(200).json(
            {
                success : true,
                message : 'Successfully change the status of course',
                data : courseDetails
            }
        )
    }catch(error){
        console.log('Error while changeing status of courses');
        return res.status(500).json(
            {
                success : false,
                message : 'Error while changeing the status of Course',
                error : error.message
            }
        )
    }
}

exports.getInstructorCourse = async (req, res)=>{
    try{
        const userID = req.user.id;
        const userDetails = await User.findById(userID).populate('courses');
        if(!userDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'User not founded'
                }
            )
        }
        
        return res.status(200).json(
            {
                success : true,
                message : 'Instructor Courses are fetched successfully',
                data : userDetails.courses
            }
        )
    }catch(error){
        console.log("Error while Instructor Courses");
        return res.status(500).json(
            {
                success : false,
                message : 'Error while fetching instructor courese',
                error : error.message
            }
        )
    }
}

exports.getInstructorDetails = async (req, res)=>{
    try{
        const userID = req.user.id;
        const userDetails = await User.findById(userID).populate('courses');
        if(!userDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'User not founded'
                }
            )
        }
        let data = [];
        userDetails.courses.forEach((course)=>{
            let answer = {
                _id : course._id,
                courseName : course.courseName,
                price : course.price * course.studentsEnrolled.length,
                studentsEnrolled : course.studentsEnrolled.length
            }
            data.push(answer)
        })

        return res.status(200).json(
            {
                success : true,
                message : 'Instructor Courses are fetched successfully',
                data : {
                    instructorDetails : data,
                    coursesData : {
                        userName : `${userDetails.firstName} ${userDetails.lastName}`,
                        courses : userDetails.courses.sort((courseA, courseB) => {
                            return courseB.ratingAndReview.length - courseA.ratingAndReview.length;
                        })
                    }
                }
            }
        )
    }catch(error){
        console.log("Error while Instructor Details");
        return res.status(500).json(
            {
                success : false,
                message : 'Error while fetching instructor details',
                error : error.message
            }
        )
    }
}

exports.removeCourseFromUser = async (req, res)=>{
    try{
        const {courseID} = req.body;
        const userID = req.user.id;

        const courseDetails = await Courses.findById(courseID);
        if(!courseDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'Course not founded'
                }
            )
        }

        if(!courseDetails.studentsEnrolled.includes(new mongoose.Types.ObjectId(userID))){
            return res.status(404).json(
                {
                    success : false,
                    message : 'User is not enrolled in Coures'
                }
            )
        }
        const deleteReviewRating = await RatingAndReview.findOneAndDelete(
            {
                user : new mongoose.Types.ObjectId(userID),
                course : courseDetails._id
            }
        )

        const updatedCourseDetails = await Courses.findByIdAndUpdate(
            courseID,
            {
                $pull : {
                    studentsEnrolled : new mongoose.Types.ObjectId(userID)
                }
            }, {new : true}
        )

        if(!updatedCourseDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Error while Deleteing User from Course"
                }
            )
        }

        const deletedCourseProgress = await CourseProgress.findOne({courseId : courseDetails._id})
        const updatedUserDetails = await User.findByIdAndUpdate(
            userID,
            {
                $pull : {
                    courses : updatedCourseDetails._id,
                    courseProgress : deletedCourseProgress._id
                }
            }, {new : true}
        ).populate({path : 'courses', populate:{path:"courseContent",populate:{path:"subSection"}}})
        .populate('additionalDetails')
        .populate('courseProgress')
        
        await CourseProgress.findByIdAndDelete(deletedCourseProgress._id)
        if(!updatedUserDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Error while Deleteing Course from User"
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : "Course is delete from successfully",
                data : updatedUserDetails
            }
        )
    }catch(error){
        console.log("Error while Removing Course from user");
        return res.status(500).json(
            {
                success : false,
                message : 'Error while Removing Course from user',
                error : error.message
            }
        )
    }
}

exports.updateCourseProgress = async (req, res)=>{
    try{
        const {courseProgressID, subsectionID, courseID} = req.body;
        const userID = req.user.id;
        if(!courseProgressID || !subsectionID){
            return res.status(404).json(
                {
                    success : false,
                    message : 'All fields are requiered'
                }
            )
        }
        await CourseProgress.createIndexes([{'completedVideo' : 1}], {unique: true,})
        const courseProgressDetails = await CourseProgress.findById(courseProgressID);
                
        if(courseProgressDetails){
            if(!courseProgressDetails.userID.equals(new mongoose.Types.ObjectId(userID)) || !courseProgressDetails.courseId.equals(new mongoose.Types.ObjectId(courseID))){
                return res.status(400).json(
                    {
                        success : false,
                        message : "Not allowed to add in courseProgress"
                    }
                )
            }
        }

        const progressAlreadyExists = courseProgressDetails.completedVideo
        if(!progressAlreadyExists.includes(subsectionID)){
            courseProgressDetails.completedVideo.push(subsectionID);
            await courseProgressDetails.save();
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Lecture already marked as complete",
              })
          }

        if(!courseProgressDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'courseProgress not founded'
                }
            )
        }

        return res.status(200).json(
            {
                success : true,
                message : 'course prograss is been update successfully',
                data : courseProgressDetails
            }
        )

    }catch(error){
        console.log("Error while Removing Course from user", error);
        return res.status(500).json(
            {
                success : false,
                message : 'Error while Removing Course from user',
                error : error.message
            }
        )
    }
}