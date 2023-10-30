import { courseEndpoint } from "../api";
import toast from "react-hot-toast";
import { apiConnect } from "../apiConnector";
import { setLoading } from "../../slices/courseSlice";

const {CREATE_CATEGORY_API,
       CREATE_COURSE_API,
       EDIT_COURSE_API,
       CREATE_RATE_REVIEW_API,
       CREATE_SECTION_API,
       CREATE_SUB_SECTION_API,
       DELETE_SECTION_API,
       DELETE_SUB_SECTION_API,
       GET_ALL_CATEGORY_API,
       GET_ALL_COURSES_API,
       GET_ALL_RATE_REVIEW_API,
       GET_AVG_RATE_API,
       GET_CATEGORY_PAGE_DETAILS_API,
       GET_COURSE_DETAILS_API,
       UPDATE_SECTION_API,
       UPDATE_SUB_SECTION_API,
       PUBLISH_COURSE_API,
       GET_INSTRUCTOR_COURSES,
       DELETE_COURSE_API,
       UNENROLLED_COURSE,
       UPDATE_COURSE_PROGRASS_API,
       GET_FULL_COURSE_DETAIL_API,
       GET_USER_RATING_API,
       UPDATE_RATING_AND_REVIEW_API,
       DELETE_RATING_AND_REVIEW_API,
       GET_COURSE_RATEING_API,
       GET_INSTRUCTOR_DETAILS_API} = courseEndpoint

// Category Api
export async function fetchAllCategory(){
    // const toastId = toast.loading('Loading...')
    let result = []
    try{
        const response = await apiConnect('GET', GET_ALL_CATEGORY_API);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.allcategory
        // console.log("GET_ALL_CATEGORY_API API RESPONSE............", response.data);
    }catch(error){
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    // toast.dismiss(toastId);
    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnect("POST", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      });
    //   console.log("EDIT COURSE API RESPONSE............", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details");
      }
      toast.success("Course Details Updated Successfully");
      result = response?.data?.data;
    } catch (error) {
    //   console.log("EDIT COURSE API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
  };

export async function getCategoryPageDetails(categoryID, dispatch){
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true))
    let result = [];
    try{
        // console.log({categoryID : categoryID});
        const response = await apiConnect('POST', GET_CATEGORY_PAGE_DETAILS_API, {categoryID : categoryID});
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success('Category Page Details fetched successfully')
        // console.log("GET_CATEGORY_PAGE_DETAILS_API API RESPONSE............", result);
    }catch(error){
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false))
    return result
}

export async function createcategory(data, token){
    const toastId = toast.loading('Loading...');
    let success = false;
    try{
        const response = await apiConnect('POST', CREATE_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('Section updated successfully')
        // console.log("CREATE_CATEGORY_API API RESPONSE............", response.data);

        success = true
    }catch(error){
        success = false
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return success
}
// Courses api
export async function createCourse(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', CREATE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("CREATE_COURSE_API API RESPONSE............", response.data);

    }catch(error){
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function fetchAllCourses(){
    const toastId = toast.loading('Loading...')
    let result = [];
    try{
        const response = await apiConnect('GET', GET_ALL_COURSES_API);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("GET_ALL_COURSES_API API RESPONSE............", response.data);

    }catch(error){
        // console.log('Error while fetching all courses');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseID, dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch && dispatch(setLoading(true))
    let result = null;
    try {
      const response = await apiConnect("POST", GET_COURSE_DETAILS_API, {
        courseID,
      });
    //   console.log("GET_COURSE_DETAILS_API API RESPONSE............", response.data);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
    } catch (error) {
    //   console.log("COURSE_DETAILS_API API ERROR............", error);
      result = error.response.data;
      // toast.error(error.response.data.message);
    }
    // toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    dispatch && dispatch(setLoading(false))
    return result;
};

export const fetchFullCourseDetails = async (courseID, dispatch, token) => {
    // const toastId = toast.loading("Loading...")
    dispatch && dispatch(setLoading(true))
    let result = null;
    try {
      const response = await apiConnect("POST", GET_FULL_COURSE_DETAIL_API, {courseID}, {
        Authorization: `Bearer ${token}`
      });
      
      if (!response.data.success) {
          throw new Error(response.data.message);
        }
        result = response.data.data;
        // console.log("GET_COURSE_DETAILS_API API RESPONSE............",result);
    } catch (error) {
    //   console.log("FULL_COURSE_DETAILS_API API ERROR............", error);
    //   result = error.response.data;
    dispatch && dispatch(setLoading(false))
    return
      // toast.error(error.response.data.message);
    }
    // toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    dispatch && dispatch(setLoading(false))
    return result;
};

export async function deletecourses(courseId, token){
    const toastId = toast.loading('Loading...');
    let result = false;
    try{
        const response = await apiConnect('DELETE', DELETE_COURSE_API, {courseId}, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success('Course delete successfully');
        // console.log("DELETE_COURSE_API API RESPONSE............", response.data);

        result = true;
    }catch(error){
        result = false
        // console.log('Error while fetching all courses');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function publishCourse(data, token){
    const toastId = toast.loading('Loading...');
    let result = null;
    try{
        const response = await apiConnect('POST', PUBLISH_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success('Course Published successfully');
        // console.log("PUBLISH_COURSE_API API RESPONSE............", response.data);

        result = response.data;
    }catch(error){
        // console.log('Error while Publisheing course');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getInstructorCourse(token){
    // const toastId = toast.loading('Loading...');
    let result = null;
    try{
        const response = await apiConnect('GET', GET_INSTRUCTOR_COURSES, {}, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        // toast.success('Fetched Instructor Courses successfully');
        // console.log("GET_INSTRUCTOR_COURSES API RESPONSE............", response.data);

        result = response.data;
    }catch(error){
        // console.log('Error while Fetching Instructor Coursese');
        // console.log(error);
    }
    // toast.dismiss(toastId);
    return result;
}

export async function getInstructorDetails(token){
    let result = null;
    try{
        const response = await apiConnect('POST', GET_INSTRUCTOR_DETAILS_API, {}, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        
        result = response.data.data;
    }catch(error){
        console.log('Error while Fetching Instructor Coursese');
        console.log(error);
    }
    return result;
}
// Section api
export async function createSection(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        toast.success('section created successfully')
        // console.log("CREATE_SECTION_API API RESPONSE............", result);

    }catch(error){
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function updateSection(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('Section updated successfully')
        result = response.data.data
        // console.log("UPDATE_SECTION_API API RESPONSE............", response.data);

    }catch(error){
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function deleteSection(data, token){
    // console.log('object');
    const toastId = toast.loading('Loading...')
    let result = null;
    // console.log(data);
    try{
        const response = await apiConnect('DELETE', DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('Section deleted successfully')
        result = response.data.data
        // console.log("DELETE_SECTION_API API RESPONSE............", result);

    }catch(error){
        // console.log('Error while deleting a section');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result
}
// subsection api
export async function createSubSection(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', CREATE_SUB_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('SubSection created successfully')
        result = response.data.data
        // console.log("CREATE_SUB_SECTION_API API RESPONSE............", response.data);

    }catch(error){
        // console.log('Error while creating SubSection');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function updateSubSection(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', UPDATE_SUB_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('SubSection updated successfully')
        result = response.data.data
        // console.log("UPDATE_SUB_SECTION_API API RESPONSE............", response.data);

    }catch(error){
        console.log('Error while updating subSection');
        console.log(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function deleteSubSection(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('DELETE', DELETE_SUB_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('SubSection deleted successfully')
        result = response.data.data
        // console.log("DELETE_SUB_SECTION_API API RESPONSE............", response.data);

    }catch(error){
        // console.log('Error while deleting subsection');
        // console.log(error);
    }
    toast.dismiss(toastId);
    return result
}
// Rating and Review api
export async function getAllRatingAndReview(){
    // const toastId = toast.loading('Loading...')
    let result = []
    try{
        const response = await apiConnect('GET', GET_ALL_RATE_REVIEW_API);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("GET_ALL_RATE_REVIEW_API API RESPONSE............", response.data);

    }catch(error){
        console.log('Error while fetching all rating and review');
        console.log(error);
    }
    // toast.dismiss(toastId);
    return result
}

export async function getCourseRatingAndReview(courseId){
    // const toastId = toast.loading('Loading...')
    let result = []
    try{
        const response = await apiConnect('POST', GET_COURSE_RATEING_API, {courseId});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("GET_COURSE_RATEING_API API RESPONSE............", response.data);

    }catch(error){
        console.log('Error while fetching Course rating and review');
        console.log(error);
    }
    // toast.dismiss(toastId);
    return result
}

export async function fetchAverageRating(courseId){
    // const toastId = toast.loading('Loading...')
    let result = 0
    try{
        const response = await apiConnect('POST', GET_AVG_RATE_API, {courseId});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.averageRating
        // console.log("GET_AVG_RATE_API API RESPONSE............", response.data);

    }catch(error){
        console.log('Error while fetching all category');
        // console.log(error);
    }
    // toast.dismiss(toastId);
    return result
}

export async function createRatingAndReview(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', CREATE_RATE_REVIEW_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("CREATE_RATE_REVIEW_API API RESPONSE............", response.data);
        toast.success('Rating and Review is been Created')

    }catch(error){
        // console.log('ERROR CREATE_RATE_REVIEW_API.......',error);
    }
    toast.dismiss(toastId);
    return result
}

export async function updateRatingAndReview(data, token){
    const toastId = toast.loading('Loading...')
    let result = null;
    try{
        const response = await apiConnect('POST', UPDATE_RATING_AND_REVIEW_API, data, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("UPDATE_RATING_AND_REVIEW_API API RESPONSE............", response.data);
        toast.success('Rating and Review is been Updated')

    }catch(error){
        // console.log('ERROR UPDATE_RATING_AND_REVIEW_API.......',error);
    }
    toast.dismiss(toastId);
    return result
}

export async function deleteRatingAndReview(ratingAndReviewID, token){
    let result = false;
    try{
        const response = await apiConnect('POST', DELETE_RATING_AND_REVIEW_API, {ratingAndReviewID}, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = true
        // console.log("DELETE_RATING_AND_REVIEW_API API RESPONSE............", response.data);

    }catch(error){
        result = false
        // console.log('ERROR DELETE_RATING_AND_REVIEW_API.......',error);
    }
    return result
}

export async function getUserRatingAndReview(courseId, token){
    const toastId = toast.loading('Loading...')
    let result = null
    try{
        const response = await apiConnect('POST', GET_USER_RATING_API, {courseId}, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }else{
            result = response.data.data
            // console.log("GET_ALL_RATE_REVIEW_API API RESPONSE............", result);
        }

        

    }catch(error){
        // console.log('Error GET_ALL_RATE_REVIEW_API.....',error);
        toast.dismiss(toastId);
        return
    }
    toast.dismiss(toastId);
    return result
}


export async function removeEnrolledCourses(courseID, token){
    const toastID = toast.loading('Loading...')
    let result;
    try{
        const response = await apiConnect('POST', UNENROLLED_COURSE, {courseID}, {
            Authorization: `Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success('Successfuuly Deleted Course');
        result = response.data.data
        // console.log('UNENROLLED_COURSE API success............', result)
    }catch(error){
        // console.log("UNENROLLED_COURSE API ERROR............", error)
        toast.error(error)
    }
    toast.dismiss(toastID);
    return result
}

export async function updateCoursePrograss(courseProgressID, courseID, subsectionID, token){
    // const toastId = toast.loading('Loading...')
    let result = null
    try{
        const response = await apiConnect('POST', UPDATE_COURSE_PROGRASS_API, {courseProgressID, subsectionID, courseID}, {
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data
        // console.log("UPDATE_COURSE_PROGRASS_API API RESPONSE............", response.data.data);

    }catch(error){
        // console.log('Error while fetching all category');
        // console.log(error);
    }
    // toast.dismiss(toastId);
    return result
}

