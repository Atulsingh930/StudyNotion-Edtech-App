const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_URL: `${BASE_URL}/course/fetchAllcategory`,
};

export const endpoints = {
    LOGIN_API : `${BASE_URL}/auth/login`,
    SIGNUP_API : `${BASE_URL}/auth/signup`,
    SENDOTP_API : `${BASE_URL}/auth/sendotp`,
    // VERIFY_TOKEN : `${BASE_URL}/auth/verify-token`,
    RESETPASSWORD_API : `${BASE_URL}/profile/resetPassword`,
    RESETPASSWORDTOKEN_API : `${BASE_URL}/profile/resetPasswordToken`,
}

export const contactUsendPoint = {
    CONTACT_US_API : `${BASE_URL}/auth/contact-us-feedback`
}

export const settingEndpoint = {
    UPDATE_USER_PROFILE_PICTURE_API : `${BASE_URL}/profile/updateProfilePicture`,
    DELETE_USERACCOUNT_API : `${BASE_URL}/profile/deleteAccount`,
    CHANGEPASSWORD_API : `${BASE_URL}/auth/changePassword`,
    UPDATE_USER_PROFILE_DETAILS_API : `${BASE_URL}/profile/updateProfile`,
    GET_ENROLLED_COURSES_API : `${BASE_URL}/profile/getEnrolledCourse`,
}

export const courseEndpoint = {
    CREATE_COURSE_API : `${BASE_URL}/course/createCourse`,
    GET_ALL_COURSES_API : `${BASE_URL}/course/showAllCourses`,
    GET_COURSE_DETAILS_API : `${BASE_URL}/course/getCourseDetails`,
    GET_FULL_COURSE_DETAIL_API : `${BASE_URL}/course/getFullCourseDetails`,
    EDIT_COURSE_API : `${BASE_URL}/course/editCourse`,
    DELETE_COURSE_API : `${BASE_URL}/course/deleteCourse`,
    PUBLISH_COURSE_API : `${BASE_URL}/course/publishCourse`,
    GET_INSTRUCTOR_COURSES : `${BASE_URL}/course/getInstructorCourses`,
    UNENROLLED_COURSE : `${BASE_URL}/course/removeCourseFromUser`,
    
    CREATE_SECTION_API : `${BASE_URL}/course/createSection`,
    UPDATE_SECTION_API : `${BASE_URL}/course/updateSection`,
    DELETE_SECTION_API : `${BASE_URL}/course/deleteSection`,

    CREATE_SUB_SECTION_API : `${BASE_URL}/course/createSubSection`,
    UPDATE_SUB_SECTION_API : `${BASE_URL}/course/updateSubSection`,
    DELETE_SUB_SECTION_API : `${BASE_URL}/course/deleteSubSection`,

    CREATE_RATE_REVIEW_API : `${BASE_URL}/course/createRatingAndReview`,
    GET_AVG_RATE_API : `${BASE_URL}/course/getAverageRating`,
    GET_ALL_RATE_REVIEW_API : `${BASE_URL}/course/getAllRatingAndReview`,
    GET_USER_RATING_API : `${BASE_URL}/course/getUserRating`,
    DELETE_RATING_AND_REVIEW_API : `${BASE_URL}/course/deleteRatingReview`,
    GET_COURSE_RATEING_API : `${BASE_URL}/course/getCourseRatingAndReview`,
    GET_INSTRUCTOR_DETAILS_API : `${BASE_URL}/course/getInstructorDetails`,


    CREATE_CATEGORY_API : `${BASE_URL}/course/createcategory`,
    GET_ALL_CATEGORY_API : `${BASE_URL}/course/fetchAllcategory`,
    GET_CATEGORY_PAGE_DETAILS_API : `${BASE_URL}/course/categoryPageDetails`,

    UPDATE_COURSE_PROGRASS_API : `${BASE_URL}/course/updateCourseProgress`,
    UPDATE_RATING_AND_REVIEW_API : `${BASE_URL}/course/updateRatingAndReview`,
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payments/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payments/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payments/sendPaymentSuccessEmail",
  };