import React, {useState} from 'react'
import { changePassword } from '../../../../services/operations/profileApi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate();
    const [passwordData, setpasswordData] = useState(
        {
            oldPassword : null,
            newPassword : null
        }
    )
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    function handleChangePassword(e){
        e.preventDefault()
        changePassword(passwordData, token);
        setpasswordData(
            {
                oldPassword : '',
                newPassword : ''
            }
        )
    }
    
    function handleCancel(){
        navigate('/dashboard/my-profile')
    }

  return (
    <form className='flex flex-col gap-8 items-end' onSubmit={handleChangePassword}>
        <div className='p-6 w-full bg-richblack-800 rounded-lg border border-richblack-700 flex gap-5 items-start flex-col' onSubmit={handleChangePassword}>
            <p>Password</p>
            <div className='w-full flex justify-between gap-3'>
            <label className='relative flex flex-col gap-[0.375rem] items-start Z-10 back '>
                <p className='text-sm text-richblack-5'>Enter Current Password<sup className='text-pink-500 ml-1'>*</sup></p>
                <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' required
                value={passwordData.oldPassword}
                onChange={(e)=>setpasswordData({...passwordData, [e.target.name] : e.target.value})}
                type={showPassword ? ("text") : ("password")}
                name='oldPassword'
                id='oldPassword' // Add id attribute
                placeholder='Enter Current Password' />

                <span className='text-2xl text-white absolute bottom-3 right-3 cursor-pointer' onClick={()=>setshowPassword((prev)=>!prev)}>
                    {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>
            </label>

            <label className='relative flex flex-col gap-[0.375rem] items-start' htmlFor="newPassword"> {/* Match the "for" attribute with the input's id */}
                <p className='text-sm text-richblack-5'>Enter New Password<sup className='text-pink-500 ml-1'>*</sup></p>
                <input className='p-3 w-[22.5rem] bg-richblack-700 border-b-2 border-richblack-500 rounded-lg' required
                value={passwordData.newPassword}
                onChange={(e)=>setpasswordData({...passwordData, [e.target.name] : e.target.value})}
                type={showConfirmPassword ? ("text") : ("password")}
                name='newPassword'
                id='newPassword' // Add id attribute
                placeholder='Enter New Password' />

                <span className='text-2xl text-white absolute bottom-3 right-3 cursor-pointer' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                    {showConfirmPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>
            </label>

            </div>
        </div>
        <div className='flex gap-4'>
            <div className='px-6 py-3 rounded-lg bg-richblack-800 text-richblack-5 font-medium cursor-pointer' onClick={handleCancel}>
                Clear
            </div>
            <button className='px-6 py-3 rounded-lg bg-yellow-50 text-richblack-800 font-medium'>
                Save
            </button>
        </div>
    </form>
  )
}

export default ChangePassword