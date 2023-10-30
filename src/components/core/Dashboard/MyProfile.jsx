import React from 'react'
import { useSelector } from 'react-redux'
import EditButton from './EditButton';

function MyProfile() {
    const {user, userImage} = useSelector((state)=>state.profile);
  return (
    <div className='flex flex-col gap-6 items-start py-6 ml-[7.5rem] w-[49.5rem]'>
        <div className='p-6 bg-richblack-800 rounded-lg border border-richblack-700 flex gap-5 items-center w-full'>
            <div className='h-[4.875rem] w-[4.875rem] object-cover flex justify-center'>
                <img className='rounded-full h-full' src={userImage} alt="" />
            </div>
            <div className='w-[32.875rem] flex flex-col gap-0.5'>
                <p className='text-xl font-semibold text-richblack-5'>{user.firstName + ' ' + user.lastName}</p>
                <p className='text-sm text-richblack-300'>{user.email}</p>
            </div>
            <EditButton name={'Edit'} path={'/dashboard/setting'}/>
        </div>
        <div className='p-6 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-5  w-full'>
            <div className='w-full flex justify-between items-center'>
                <p className='font-medium text-richblack-25 text-xl'>About</p>
                <EditButton name={'Edit'} path={'/dashboard/setting'}/>
            </div>
            {
                user.additionalDetails.about ? <p className='text-sm text-richblack-5 font-medium'>{user.additionalDetails.about}</p> : <p className='text-sm text-richblack-400 font-medium'>Write Something About Yourself</p>

            }
        </div>
        <div className=' w-full p-6 bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col gap-5 items-center'>
            <div className='flex justify-between w-full items-center'>
                <p className='font-medium text-richblack-25 text-xl'>Personal Details</p>
                <EditButton name={'Edit'} path={'/dashboard/setting'}/>
            </div>
            <div className='flex justify-between w-full items-center'>
                <div className='flex flex-col w-full gap-0.5 items-start'>
                    <p className='w-1/2 text-richblack-600 text-sm'>First Name</p>
                    <p className='w-1/2 text-richblack-5 font-medium text-sm'>{user.firstName}</p>
                </div>
                <div className='flex flex-col w-full gap-0.5 items-start'>
                    <p className='w-1/2 text-richblack-600 text-sm'>Last Name</p>
                    <p className='w-1/2 text-richblack-5 font-medium text-sm'>{user.lastName}</p>
                </div>
            </div>
            <div className='flex justify-between w-full items-center'>
                <div className='flex flex-col w-full gap-0.5 items-start'>
                    <p className='w-1/2 text-richblack-600 text-sm'>Email</p>
                    <p className='w-1/2 text-richblack-5 font-medium text-sm'>{user.email}</p>
                </div>
                <div className='flex flex-col w-full gap-0.5 items-start'>
                    <p className='w-1/2 text-richblack-600 text-sm'>Phone Number</p>
                    <p className='w-1/2 text-richblack-5 font-medium text-sm'>{user.additionalDetails.contactNumber ? user.additionalDetails.contactNumber : 'Add Contact Number'}</p>
                </div>
            </div>
            <div className='flex justify-between w-full items-center'>
                <div className='flex flex-col w-full gap-0.5 items-start'>
                    <p className='w-1/2 text-richblack-600 text-sm'>Gender</p>
                    <p className='w-1/2 text-richblack-5 font-medium text-sm'>{user.additionalDetails.gender?user.additionalDetails.gender : 'Add Gender'}</p>
                </div>
                <div className='flex flex-col w-full gap-0.5 items-start'>
                    <p className='w-1/2 text-richblack-600 text-sm'>Date of Birth</p>
                    <p className='w-1/2 text-richblack-5 font-medium text-sm'>{user.additionalDetails.dateOfBirth ? user.additionalDetails.dateOfBirth : 'January 1, 1970'}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile