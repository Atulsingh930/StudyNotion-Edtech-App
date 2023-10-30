import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails, fetchFullCourseDetails, getUserRatingAndReview } from '../services/operations/courseDetailsApi';
import { courseDuration } from '../utils/constants';
import VideoDetailSideBar from '../components/core/ViewCourse/VideoDetailSideBar';
import { setCourseProgressDetails, setCourseSectionData, setntireCoureData } from '../slices/viewCourseSlice';
import VideoPlayer from '../components/core/ViewCourse/VideoPlayer';
import { setRatingReview } from '../slices/viewCourseSlice';

function ViewCourses() {

    
    const {courseID} = useParams()
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const [courseData, setcourseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {courseSectionData, entireCoureData, ratingAndReview} = useSelector((state)=>state.viewCourse);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function getUserRating(){
        const result = await getUserRatingAndReview(courseID, token);
        if(result){
            dispatch(setRatingReview(result));
            return
        }else{
            dispatch(setRatingReview(null))
            return
        }
    }
    useEffect(() => {
        getEnrolledCouresDetails();
        getUserRating()
    }, [courseID])
    if(entireCoureData && !entireCoureData?.studentsEnrolled?.includes(user._id)){
        toast.error('You are not enrolled in this Course');
        navigate('/');
        return
    }

    async function getEnrolledCouresDetails(){
        setLoading(true)
        const response = await fetchFullCourseDetails(courseID, dispatch, token);
        if(response){
            dispatch(setntireCoureData(response?.courseDetails))
            dispatch(setCourseSectionData(response?.courseDetails?.courseContent))
            dispatch(setCourseProgressDetails(response?.courseProgressDetails))
            const data = courseDuration(response?.courseDetails?.courseContent);
            setcourseData(data)
        }
        setLoading(false)
    }


  return (
    loading ? (<div className='loader'></div>) : (
        <div className='w-full mt-14 flex'>
            <VideoDetailSideBar lectureNo={courseData?.totalSubSections} sectionTime = {courseData?.sectionTimeArray}/>
            <div className='w-[calc(100vw-19.75rem)]'>
                <Outlet/>
            </div>

        </div>
    )
  )
}

export default ViewCourses