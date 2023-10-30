import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePicture } from '../../../../services/operations/profileApi';

function ProfileImageUploader() {
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {userImage} = useSelector((state)=>state.profile);
    const [userProfile, setUserProfile] = useState(userImage)

    function handleProfileChange(e){
        e.preventDefault();
        const imageFile = e.target[0].files[0];
        updateProfilePicture(imageFile, token, dispatch);
    }


  return (
    <div className='w-full p-6 bg-richblack-800 rounded-lg border border-richblack-700 flex gap-5 items-start'>
        <div className='flex items-center'>
            <img className='rounded-full h-[4.875rem] aspect-square' src={userProfile} alt="" />
        </div>
        <div className='flex flex-col gap-3 items-start'>
            <p className='font-medium text-richblack-25'>Change Profile Picture</p>
            <form className='flex gap-3' onSubmit={handleProfileChange}>
                <label className='text-richblack-50 px-[1.125rem] py-[0.375rem] bg-richblack-700 rounded-lg border border-richblack-600 cursor-pointer' htmlFor="userProfile">
                    Select
                    <input className='hidden' type="file" onChange={(event)=>{setUserProfile(URL.createObjectURL(event.target.files[0]))}} name="imageFile" id="userProfile" />
                </label>
                <button className='text-richblack-900 font-medium px-[1.125rem] py-[0.375rem] bg-yellow-50 shadow-[-0.5px_-1.5px_0px_0px_rgba(0_0_0_0.12)_inset] rounded-lg border border-richblack-600'>
                    Uploading
                </button>
            </form>
        </div>
    </div>
  )
}

export default ProfileImageUploader