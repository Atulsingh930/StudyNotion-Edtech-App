const User = require('../models/User');
const Courses = require('../models/Courses');
const {instance} = require('../config/razorpay');
const mailsender = require('../utils/mailsender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {paymentSuccess} = require('../mail/templates/paymentSuccess');
const { default: mongoose } = require('mongoose');
const crypto = require('crypto');
const { errorMonitor } = require('nodemailer/lib/xoauth2');
const mailSender = require('../utils/mailsender');
const CourseProgress = require('../models/CourseProgress');

exports.capturePayment = async (req, res)=>{

    const {courses} = req.body;
    const userID = req.user.id;

    if(courses.length < 0){
        return res.status(404).json(
            {
                success : false,
                message : 'please Insert atleast one Course'
            }
        )
    }

    let totalAmount = 0;
    for (const course_id of courses){
        let course;
        try{
            course = await Courses.findById(course_id);
            if(!course){
                return res.status(400).json(
                    {
                        success : false,
                        message : "Error while fetching Course"
                    }
                )
            }

            if(course.studentsEnrolled.includes(new mongoose.Types.ObjectId(userID))){
                return res.status(200).json(
                    {
                        success : false,
                        message : "User is already enrolled in Course"
                    }
                )
            }
            totalAmount += course.price
        }catch(error){
            console.log(error);
            return res.status(500).json(
                {
                    success : false,
                    message : "server Error",
                    error : error.message
                }
            )
        }

    }

    // create a order for razorpay payments
    const currency = "INR";
    const amount = totalAmount;
    // creating options for instatnce
    const options = {
        amount: amount * 100,  // Amount in the smallest currency unit (e.g., cents)
        currency: currency,
        receipt: Date.now().toString(),  // Generate a timestamp-based receipt
    };

    try{
        // creating order for payment and passing additional information in response
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json(
            {
                success : true,
                orderID : paymentResponse.id,
                amount : paymentResponse.amount,
                currency : paymentResponse.currency
            }
        )

    }catch(error){
        return res.status(500).json(
            {
                success : false,
                message : error.message
            }
        )
    }
    
}


exports.verifySignature = async (req, res) => {
    try{
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;
        const userID = req.user.id;
    
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !courses || !userID) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
    
        let body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');
        
        const updatedUserDetails = await enrolledCourse(courses, userID, res);
    
        if (expectedSignature === razorpay_signature && updatedUserDetails.success) {
            return res.status(200).json({
                success: true,
                message: 'Successfully made transaction and User enrolled in course',
                data: updatedUserDetails
            });
        } 
    }catch(error){
        console.log(error)
        return res.status(200).json({
            success: false,
            message: 'Payment failed',
            error
        });
    }
};


async function enrolledCourse(courses, userID, res){

    for(const course_id of courses){
        const updateCourseDetails = await Courses.findByIdAndUpdate(
            course_id,
            {
                $push : {
                    studentsEnrolled : userID
                }
            },
            {new : true}
        );
        if(!updateCourseDetails){
            return res.status(400).json(
                {
                    success : false,
                    message : "Course not found"
                }
            )
        }
        const updateUserCourseProgress = await CourseProgress.create(
            {
                courseId : course_id,
                userID : userID
            }
        )
        const updateUserDetails = await User.findByIdAndUpdate(
            userID,
            {
                $push : {
                    courses : course_id,
                    courseProgress : updateUserCourseProgress._id
                }
            },
            {new : true}
        ).populate({path:"courses",populate : {path:"courseContent",populate:{path:"subSection"}}})
        .populate('additionalDetails')
        .populate('courseProgress')
        .exec()
        if(!updateUserDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : "Could'nt add courses in User's courses"
                }
            )
        }
        const mailSenderResponse = await mailSender(updateUserDetails.email, `Successfully Enrolled in ${updateCourseDetails.courseName}`, courseEnrollmentEmail(updateCourseDetails.courseName, `${updateUserDetails.firstName} ${updateUserDetails.lastName}`))

        if(course_id===courses[courses.length-1]){
            return res.status(200).json(
                {
                    success : true,
                    message : "Course Enrolled SuccessFully",
                    data : updateUserDetails
                }
            )
        }
    }

}

// exports.verifySignature = async (req, res)=>{
//     try{
//         // fetching webhook from server
//         const webHookSecret = process.env.WEBHOOK_SECRET
//         // razorpay return signature in header
//         const signature = req.header["x-razorpay-signature"];
//         // signature is encrypted so encrypting webhook for verification
//         const shasum = crypto.createHmac("sha256", webHookSecret);
//         shasum.update(JSON.stringify(shasum));
//         const digest = shasum.digest('hex');
//         // verify signature and what if it is not same
//         if(signature!==digest){
//             return res.status(400).json(
//                 {
//                     success : false,
//                     message : "webhook and signature are not same"
//                 }
//             )
//         }
//         // fetching courseID userId from options passed in instances
//         const {courseID, userId} = req.body.payload.payment.entity.notes;
//         // validating and adding userID in studentsEnrolled
//         const enrolledStudentCourse = await Courses.findOneAndUpdate(
//             courseID,
//             {$push : {studentsEnrolled : userId}},
//             {new : true}
//         )

//         if(!enrolledStudentCourse){
//             return res.status(500).json(
//                 {
//                     success : false,
//                     message : "Course not found or error while adding userID in courses"
//                 }
//             )
//         }
//         // validating and adding courseID in courses
//         const addCourseInUser = await User.findOneAndUpdate(
//             userId,
//             {$push : {courses : courseID}},
//             {new : true}
//         )

//         if(!addCourseInUser){
//             return res.status(500).json(
//                 {
//                     success : false,
//                     message : "User not found or error while adding courseID in User"
//                 }
//             )
//         }
//         // sending mail using mailsender
//         const emailResponse = await mailsender(
//             addCourseInUser.email,
//             "StudyNotion | Major project",
//             courseEnrollmentEmail(
//                 enrolledStudentCourse.courseName, 
//                 addCourseInUser.email
//             )
//         )
//         // return response
//         return res.status(200).json(
//             {
//                 success : true,
//                 message : "Payment successfull and course has been added to user"
//             }
//         )

//     }catch(error){
//         return res.status(200).json(
//             {
//                 success : false,
//                 message : error.message
//             }
//         )
//     }
// }

exports.sendPaymentSuccessEmail = async (req, res)=>{
    try{
        const {amount, paymentId, orderId} = req.body;
        const userId = req.user.id;

        if(!amount || !paymentId || !orderId){
            return res.status(200).json(
                {
                    success : false,
                    message : "Please provide valid payment details"
                }
            )
        }

        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json(
                {
                    success : false,
                    message : 'User not found'
                }
            )
        }
        console.log(userDetails.email)
        const emailResponse = await mailsender(
            userDetails.email,
            "StudyNotion || Payments Success",
            paymentSuccess((amount/100), paymentId, orderId, userDetails.firstName, userDetails.lastName)
        )

        return res.status(200).json(
            {
                success : true,
                message : "Payment mail successfully sended",
                date : emailResponse            
            }
        )
    }catch(error){
        return res.status(200).json(
            {
                success : false,
                message : error.message
            }
        )
    }
}