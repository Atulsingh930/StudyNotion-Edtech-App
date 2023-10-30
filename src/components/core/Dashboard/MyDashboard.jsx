import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getInstructorDetails } from '../../../services/operations/courseDetailsApi'
import { useSelector } from 'react-redux'
import DashboardCard from '../../common/DashboardCard'
import { PieChart } from '@mui/x-charts/PieChart'


function MyDashboard() {

    const{token} = useSelector((state)=>state.auth)
    const [courses, setCourses] = useState([])
    const [instructorCourseDetails, setInstructorCourseDetails] = useState([])
    const [userName, setUserName] = useState('');
    const [currentChart, setcurrentChart] = useState('revenue')
    const [loading, setLoading] = useState(false)

    async function instructorDetails(){
        setLoading(true);
        const result = await getInstructorDetails(token);
        if(!result){
            return;
        }setCourses(result?.coursesData?.courses)
        setUserName(result?.coursesData?.userName)
        setInstructorCourseDetails(result?.instructorDetails)
        setLoading(false);
    }

    useEffect(() => {
        instructorDetails()
    }, [])

    let instructorData = []
    let totalPrize = 0
    let totalStudentEnrolled = 0
    instructorCourseDetails.forEach((data)=>{
        let iteam = { id: data?._id, value: currentChart === 'revenue' ? data?.price : data?.studentsEnrolled, label: currentChart ==='revenue' ? `${data?.courseName} of Rupee` : data?.courseName }
        totalPrize+=data?.price
        totalStudentEnrolled += data?.studentsEnrolled
        instructorData.push(iteam);
    })

    
  return (
    loading ? (<div className='loader'></div>) : (
        <div className='realtive w-11/12 max-w-maxContent  py-10 mx-auto flex flex-col gap-4'>
        <div className='w-full flex flex-col items-start gap-1'>
            <p className='text-richblack-5 text-2xl font-bold'>Hi {userName} 👋</p>
            <p className='text-richblack-200 font-medium -tracking-tight'>Let’s start something new</p>
        </div>
        <div className='w-full h-96 flex gap-8'>
            <div className='bg-richblack-800 p-6 rounded-lg h-full items-end flex flex-col'>
            <div className='flex gap-2 text-richblack-200 text-lg'>
                <button onClick={()=>setcurrentChart('revenue')} className={`px-5 py-2 rounded-lg transition-all duration-150 ${currentChart === 'revenue' && 'text-yellow-50 bg-richblack-900'} `}>Revenue</button>
                <button onClick={()=>setcurrentChart('student')} className={`px-5 py-2 rounded-lg transition-all duration-150 ${currentChart !== 'revenue' && 'text-yellow-50 bg-richblack-900'}`}>Student</button>
            </div>
            <PieChart className='h-full'
             margin={{ top: 10, bottom: 10, left: 0, right:0 }}
                slotProps={{
                    legend: {
                      hidden : true,  
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: -20,
                      labelStyle: {
                        fontSize: 10,
                        fill: 'white',
                      },
                    },
                  }}
            width={650}
                series={[
                  {
                    data: [...instructorData],
                  },
                ]}
            />
            </div>
            <div className='h-full bg-richblack-800 w-full p-6 flex flex-col gap-5'>
                <p className='text-xl text-richblack-200'>Statistics</p>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-xl text-richblack-200'>Total Courses</p>
                    <p className='text-3xl text-richblack-50 font-medium'>{instructorCourseDetails?.length}</p>
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-xl text-richblack-200'>Total Students</p>
                    <p className='text-3xl text-richblack-50 font-medium'>{totalStudentEnrolled}</p>
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-xl text-richblack-200'>Total Earnings</p>
                    <p className='text-3xl text-richblack-50 font-medium'>₹ {totalPrize.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
        <div className='w-full bg-richblack-800 rounded-lg flex flex-col items-start p-6 gap-6'>
            <div className='w-full flex items-center justify-between'>
                <p className='text-richblack-25 font-bold text-lg'>Your Courses</p>
                <Link to={'/dashboard/my-courses'}>
                    <p className='cursor-pointer text-yellow-50 text-sm font-semibold'>View All</p>
                </Link>
            </div>
            <div className='w-full flex gap-6 items-center'>
                {
                    courses.slice(0, 3)?.map((course)=>(
                        <DashboardCard course={course} userName={userName} key={course._id}/>
                    ))
                }
            </div>
        </div>
    </div>
    )
  )
}

export default MyDashboard