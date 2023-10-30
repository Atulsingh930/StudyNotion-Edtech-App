import React, { useState } from 'react'
import menuDots from '../../../../assets/Images/menuDots.svg'
import { convertSeconds, courseDuration } from '../../../../utils/constants';
import {LuFileCheck} from 'react-icons/lu'
import { MdDelete } from 'react-icons/md';
import { removeEnrolledCourses } from '../../../../services/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../../../slices/profileSlice';

function EnrolledCoursesCard({courses, getEnrolledcourse, courseProgress}) {

    const {token} = useSelector((state)=>state.auth);
    const [coursePosition, setCoursePosition] = useState('All')
    const dispatch = useDispatch();

    async function handleDeleteCourse(courseID){
        const result = await removeEnrolledCourses(courseID, token);
        if(result){
            dispatch(setUser(result))
            getEnrolledcourse();
        }
    }

  return (
    <div className='w-full px-8 flex flex-col gap-8 pb-20'>
        <div className='flex justify-center bg-richblack-800 p-1 w-[17.0375rem] rounded-3xl'>
            <div onClick={()=>setCoursePosition('All')} className={`rounded-3xl cursor-pointer ${coursePosition==='All'?'bg-richblack-900':'bg-richblack-800'} transition-all duration-150 py-[0.375rem] px-[1.125rem] font-medium text-center`}>All</div>
            <div onClick={()=>setCoursePosition('Pending')} className={`rounded-3xl cursor-pointer ${coursePosition==='Pending'?'bg-richblack-900':'bg-richblack-800'} transition-all duration-150 py-[0.375rem] px-[1.125rem] font-medium text-center`}>Pending</div>
            <div onClick={()=>setCoursePosition('Completed')} className={`rounded-3xl cursor-pointer ${coursePosition==='Completed'?'bg-richblack-900':'bg-richblack-800'} transition-all duration-150 py-[0.375rem] px-[1.125rem] font-medium text-center`}>Completed</div>
        </div>
        <div className='w-full rounded-lg'>
            <table className='border border-richblack-700 rounded-lg'>
                <tr className='bg-richblack-700 rounded-lg'>
                    <th className='p-4 font-medium text-sm text-richblack-50 w-[36.375rem]'>
                        <p className=' flex justify-start items-center w-full'>Course Name</p>
                    </th>
                    <th className='p-4 font-medium text-sm text-richblack-50 w-[14.625rem]'>
                        <p className=' flex justify-start items-center w-full'>Durations</p>
                    </th>
                    <th className='p-4 font-medium text-sm text-richblack-50 w-[14.625rem]'>
                        <p className=' flex justify-start items-center w-full'>Progress</p>
                    </th>
                    <th className='p-4 font-medium text-sm text-richblack-700 w-[7rem]'>
                        <p>Durations</p>
                    </th>
                </tr>
                {
                    courses.map((course, index)=>{
                        let data = courseDuration(course.courseContent);
                        let uniqueCourseprogress = [...(new Set(courseProgress[index]?.completedVideo))]
                        console.log(uniqueCourseprogress, 'with set')
                        let courseprogressPercent = uniqueCourseprogress?.length>0 ? Math.floor((uniqueCourseprogress?.length)*100/data?.totalSubSections) : 0
                        let duration = convertSeconds(data.totalDuration)
                        return (
                            ((coursePosition=== 'Completed' && uniqueCourseprogress?.length===data?.totalSubSections) || (coursePosition=== 'Pending' && uniqueCourseprogress?.length<data?.totalSubSections) || coursePosition==='All') && (
                                <tr key={course._id} className='border-t border-richblack-700'>
                                <Link to={`/view-course/${course._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0].subSection?.[0]?._id}`}>
                                    <td className='w-[36.375rem] p-4 flex gap-5 items-center'>
                                        <img src={course.thumbnail} alt="" height={52} width={52} />
                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-semibold text-richblack-5 truncate-ellipsis'>{course.courseName}</p>
                                            <p className='w-[30rem] text-richblack-300 text-ellipsis overflow-x-hidden whitespace-nowrap'>{course.courseDescription}</p>
                                        </div>
                                    </td>
                                </Link>
                                <td className='w-[14.625rem] p-4 text-richblack-50 font-medium'>{duration}</td>
                                <td className='w-[14.625rem] p-4 '>
                                    <p className='text-sm text-richblack-50 font-medium -tracking-tight'>Progress {courseprogressPercent}%</p>
                                    <div className='h-2 w-[12.625rem] bg-richblack-700 rounded-xl'>
                                        <div style={{width : `${courseprogressPercent+'%'}`, backgroundColor : `${uniqueCourseprogress?.length===data?.totalSubSections ? '#06D6A0' : '#47A5C5'}`}} className={`h-full rounded-xl`}></div>
                                    </div>
                                </td>
                                <td className='relative p-4 text-richblack-200 w-20 flex justify-center items-center group cursor-pointer transition-all duration-200'>
                                    <img src= {menuDots} height={24} width={24} alt='' />
                                    <div className='invisible z-10 opacity-0 absolute p-3 w-[12.9375rem] flex flex-col gap-3 items-start bg-richblack-600 top-11 right-9 border border-richblack-500 rounded-lg transition-all duration-150 group-hover:opacity-100 group-hover:visible'>
                                        <button className='flex gap-3 items-center justify-center text-richblack-5 font-semibold'>
                                            <LuFileCheck className='text-xl'/>
                                            <p className='text-[16px]'>Mark as Completed</p>
                                        </button>
                                        <button  onClick={()=>handleDeleteCourse(course._id)} className='flex gap-3 items-center justify-center text-richblack-5 font-semibold'>
                                            <MdDelete className='text-xl'/>
                                            <p className='text-[16px]'>Delete</p>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            )
                        )})
                }
                {/* <td className='w-full'>
                    {
                        courses.map(course=>{
                            let data = courseDuration(course.courseContent);
                            data = convertSeconds(data.totalDuration)
                            return (
                                <div className='flex items-center border-t border-richblack-700'>
                                    <div className='w-[36.375rem] p-4 flex gap-5 items-center '>
                                        <img src={course.thumbnail} alt="" height={52} width={52} />
                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-semibold text-richblack-5 truncate-ellipsis'>{course.courseName}</p>
                                            <p className='text-richblack-300'>{course.courseDescription}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14.625rem] p-4 text-richblack-50 font-medium items-center'>
                                        {data}
                                    </div>
                                    <div className=''>
                                        <p className='text-sm text-richblack-50 font-medium -tracking-tight'>Progress 65%</p>
                                        <div className='h-2 w-[12.625rem] bg-richblack-700 rounded-xl'>
                                            <div className='h-full w-[65%] bg-blue-100 rounded-xl'></div>
                                        </div>
                                    </div>
                                    <div '>
                                        
                                    </div>
                                </div>
                            )
                        }) 
                    }
                </div> */}
            </table>
        </div>
    </div>
  )
}

export default EnrolledCoursesCard