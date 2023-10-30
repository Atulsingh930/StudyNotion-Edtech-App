import React, {useState} from 'react';
import OTPInput from 'react-otp-input';
import Button from '../components/core/HomePage/Button';
import {BsArrowLeft} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import {PiClockCounterClockwise} from 'react-icons/pi';
import { signUp } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const {signUpData} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const {email, firstName, lastName, password, confirmPassword, accountType} = signUpData
    const dispatch = useDispatch();
    function handleSubmit(){
        dispatch(signUp(email, firstName, lastName, password, confirmPassword, accountType, Number(otp), navigate))
    }
  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>
        <div className='flex flex-col gap-6 p-4 w-[31.75rem] mt-10'>
            <div className='flex flex-col gap-3'>
                <p className='text-3xl text-richblack-5 font-semibold'>Verify email</p>
                <p className='text-lg text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
            </div>
            <form className='flex flex-col gap-6'>
            <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                inputStyle="w-[20px] bg-richblack-800 rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
                focusStyle="border-[5px] border-red-500"
                isInputNum={true}
                shouldAutoFocus={true}
                containerStyle="flex justify-between gap-4"
                renderInput={(props) => <input {...props} />}
                />
            <div>
                <button onClick={handleSubmit} className='w-full'>
                    <Button text={'Verify and Register'} active={true}linkTo={''}/>
                </button>
                <div className='flex gap-3 justify-between'>
                    <div className='flex gap-3 items-center p-3'>
                        <BsArrowLeft/>
                        <p>Back to login</p>
                    </div>
                    <div className='flex gap-3 items-center p-3 text-lg text-blue-100'>
                        <PiClockCounterClockwise/>
                        <p>Resend it</p>
                    </div>
                </div>
            </div>
            </form>

        </div>
    </div>
  )
}

export default VerifyOtp