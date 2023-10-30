import React from 'react'

function StatsComponent() {
  return (
    <div className='bg-richblack-800 py-[5.62rem]'>
        <div className='w-11/12 max-w-maxContent mx-auto flex justify-center items-center gap-[0.62rem]'>
            <div className='flex flex-col gap-3 w-[18.28125rem]'>
                <p className='text-3xl text-richblack-5 font-bold text-center'>5K</p>
                <p className='text-base text-richblack-500 font-semibold text-center'>Active Students</p>
            </div>
            <div className='flex flex-col gap-3 w-[18.28125rem]'>
                <p className='text-3xl text-richblack-5 font-bold text-center'>10+</p>
                <p className='text-base text-richblack-500 font-semibold text-center'>Mentors</p>
            </div>
            <div className='flex flex-col gap-3 w-[18.28125rem]'>
                <p className='text-3xl text-richblack-5 font-bold text-center'>200+</p>
                <p className='text-base text-richblack-500 font-semibold text-center'>Courses</p>
            </div>
            <div className='flex flex-col gap-3 w-[18.28125rem]'>
                <p className='text-3xl text-richblack-5 font-bold text-center'>50+</p>
                <p className='text-base text-richblack-500 font-semibold text-center'>Active Students</p>
            </div>
        </div>
    </div>
  )
}

export default StatsComponent