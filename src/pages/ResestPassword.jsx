import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/core/HomePage/Button';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authApi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


function ResestPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [resetComplete, setResetComplete] = useState(false)
    const location = useLocation();
    const dispatch = useDispatch();

    function handleSubmit(){
        dispatch(resetPassword(password, confirmPassword, location.pathname.split('/')[2],setResetComplete))
    }

  return (
    <div className='w-full h-[90vh] flex justify-center items-center font-inter relative'>

        {
            resetComplete ? (   
                <div className='w-[31.75rem] gap-6 p-8 flex flex-col items-start mb-10'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-3xl text-richblack-5 font-semibold'>Reset complete!</p>
                        <p className='text-lg text-richblack-100'>All done! We have sent an email to m***********@gmail.com to confirm</p>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <button onClick={handleSubmit} type='submit'>
                            <Button text={'Return to login'} active={true} linkTo={'/login'}/>
                        </button>
                        <div className='flex gap-3 items-center w-full'>
                            <BsArrowLeft />
                            <Link to={'/login'}>
                                <p>Back to login</p>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-[31.75rem] gap-6 p-8 flex flex-col items-start'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-3xl text-richblack-5 font-semibold'>Choose  new password</p>
                        <p className='text-lg text-richblack-100'>Almost done. Enter your new password and youre all set.</p>
                    </div>
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex flex-col gap-[0.375rem]'>
                            <label className='text-sm text-richblack-5' htmlFor="password">New password <span className='text-pink-200'>*</span></label>
                            <div className='relative w-full'>
                                <input className='p-3 bg-richblack-800 w-full rounded-lg shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset]' type= {showPassword ? 'text' : 'password'} id='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
                                <span className='text-2xl absolute bottom-3 right-3 cursor-pointer' onClick={()=>setshowPassword((prev)=>!prev)}>
                                    {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[0.375rem] w-full'>
                            <label className='text-sm text-richblack-5' htmlFor="password">Confirm new password <span className='text-pink-200'>*</span></label>
                            <div className='relative w-full'>
                                <input className='w-full p-3 bg-richblack-800 rounded-lg shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset]' type= {showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Enter confirm Password'/>
                                <span className='text-2xl absolute bottom-3 right-3 cursor-pointer' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                    {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <button onClick={handleSubmit} type='submit'>
                                <Button text={'Resend email'} active={true}/>
                            </button>
                            <div className='flex gap-3 items-center w-full'>
                                <BsArrowLeft />
                                <Link to={'/login'}>
                                    <p>Back to login</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


    </div>
  )
}

export default ResestPassword