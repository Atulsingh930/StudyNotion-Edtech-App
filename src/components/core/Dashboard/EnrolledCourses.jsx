import React, { useEffect, useState } from 'react'
import {getEnrolledCourses} from '../../../services/operations/profileApi'
import { useDispatch, useSelector } from 'react-redux'
import EnrolledCoursesCard from './Setting/enrolledCoursesCard'
import { setUser } from '../../../slices/profileSlice'

function EnrolledCourses() {

    const [enrolledCourse, setenrolledCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state)=>state.auth);

    const getEnrolledcourse = async ()=>{
        setLoading(true)
        const result = await getEnrolledCourses(token);
        if(result){
            setenrolledCourse(result)
        }
        setLoading(false)
    }

    useEffect(() => {
        getEnrolledcourse();
    }, [])
  return (
    loading ? (<div className='loader left-[55rem]'></div>) : (
        <>
            
            {enrolledCourse?.courses?.length >0 ? (<EnrolledCoursesCard courses={enrolledCourse.courses} courseProgress={enrolledCourse.courseProgress} getEnrolledcourse={getEnrolledcourse} token={token}/>) : (<div className='w-[76rem] flex justify-center text-richblack-25 font-medium'>You have not enrolled in any course yet.</div>)}
        </>
    )
  )
}

export default EnrolledCourses