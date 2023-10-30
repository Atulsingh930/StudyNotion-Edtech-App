import React, { useEffect, useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import {GoCheckCircleFill, GoClockFill } from 'react-icons/go';
import {MdDelete } from 'react-icons/md';
import {HiMiniPencil } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletecourses, getInstructorCourse } from '../../../services/operations/courseDetailsApi';
import ConfirmationModal from '../../common/ConfirmationModal';
import {convertToIST} from '../../../utils/constants'

function MyCourses() {
    const navigate = useNavigate();
    const [instructorCourses, setInstructorCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const{token} = useSelector((state)=>state.auth);

    const handleAddCourse = () => {
        navigate('/dashboard/add-course')
    }

    async function getInstructorCouresesApi(token){
        setLoading(true);
        const result = await getInstructorCourse(token);
        setInstructorCourses(result.data);
        setLoading(false);
    }

    useEffect(() => {
        getInstructorCouresesApi(token);
    }, [])

    async function handleDeleteCourse(courseID){
        setLoading(true);
        await deletecourses(courseID, token);
        const result = await getInstructorCourse(token);
        if(result){
            setInstructorCourses(result.data);
        }
        setModalData(null);
        setLoading(false);
    }
    
    // function convertToIST(utcTimestamp) {
    //     // Create a Date object from the UTC timestamp
    //     const date = new Date(utcTimestamp);
    
    //     // Convert the date to IST
    //     date.setHours(date.getHours() + 5); // Add 5 hours to convert from UTC to IST
    //     date.setMinutes(date.getMinutes() + 30); // Add 30 minutes for IST's offset
    
    //     // Format the date as "Month Day, Year | Hour:Minute AM/PM"
    //     const options = {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         hour12: true,
    //     };
    //     let istDate = date.toLocaleString('en-US', options);
    //     istDate = istDate.split('at').join('|')
    
    //     return istDate;
    // }
    
        
    return (
        loading ? (<div className='loader'></div>) : (
            <div className='m-6 w-full flex flex-col gap-3'>
            <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col ga-2'>
                    <div className='flex gap-2 text-sm text-richblack-400'>
                        <p>Home</p>
                        <p className='text-richblack-600'>/</p>
                        <p>Dashboard</p>
                        <p className='text-richblack-600'>/</p>
                        <p className='text-yellow-50 font-medium'>Courses</p>
                    </div>
                    <p className='text-3xl text-richblack-5 font-medium'>My Course</p>
                </div>
                <button onClick={handleAddCourse} className='px-6 py-3 flex items-center gap-2 text-richblack-900 font-medium bg-yellow-50 rounded-lg shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] transition-all duration-200 hover:scale-95'>
                    <GrAddCircle className='text-lg' />
                    <p>New</p>
                </button>
            </div>
            <table className='rounded-lg border border-richblack-800 text-white'>
                <tr className='text-sm font-medium text-richblack-100'>
                    <th className='w-[47.9375rem] p-4 '><p className='w-full flex items-start'>COURSES</p></th>
                    <th className='p-4'>DURATION</th>
                    <th className='p-4'>PRICE</th>
                    <th className='p-4'>ACTIONS</th>
                </tr>
                {
                    instructorCourses.map((course)=>(
                        <tr key={course._id} className='border-t border-richblack-800'>
                            <td className='p-4 flex gap-6 w-[47.9375rem]'>
                                <img src={course.thumbnail} height={148} width={221} alt="" />
                                <div className='flex flex-col items-start gap-2'>
                                    <p className='text-xl text-richblack-5 font-semibold'>{course.courseName}</p>
                                    <p className='text-sm text-richblack-300 -tracking-tight'>{course.courseDescription}</p>
                                    <p className='text-xs text-richblack-25 font-medium -tracking-tighter text-center'>Created:{convertToIST(course.createdAt)}</p>
                                    <div className='px-2 py-0.5 bg-richblack-700 rounded-2xl flex gap-1.5 items-center text-yellow-50'>
                                        {
                                            course.status === 'Published' ? (<><GoCheckCircleFill/><p>Published</p></>) : (<><GoClockFill className='text-pink-100'/><p className='text-pink-100'>Draft</p></>)
                                        }
                                    </div>
                                </div>
                            </td>
                            <td className='p-4 text-richblack-100 text-sm font-semibold'><p className='flex justify-center'>18h 30m</p></td>
                            <td className='p-4 text-richblack-100 text-sm font-semibold'><p className='flex justify-center'>₹{course.price}</p></td>
                            <td className='p-4 text-richblack-100 text-sm font-semibold'>
                                <div className='w-full flex gap-2.5 justify-center text-[1.5rem]'>
                                    <button className=' rounded-full p-2 hover:text-pink-200 hover:bg-pink-700 transition-all duration-150 cursor-pointer'
                                    onClick={()=>{
                                        setModalData(
                                            {
                                                text1 : "Do you want to Delete this Courses?",
                                                text2 : "All the Lectures and Data Related to this Course wil be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteCourse(course._id),
                                                btn2Handler: () => setModalData(null),
                                            }
                                        )
                                    }}
                                    >
                                        <MdDelete/>
                                    </button>
                                    <button onClick={()=>navigate(`/dashboard/edit-courses/${course._id}`)}
                                    className=' rounded-full p-2 hover:text-yellow-25 hover:bg-yellow-500 transition-all duration-150 cursor-pointer'>
                                        <HiMiniPencil/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))   
                }
            </table>
            {modalData!==null && <ConfirmationModal modalData={modalData}/>}
        </div>
        )
    );
}

export default MyCourses;
