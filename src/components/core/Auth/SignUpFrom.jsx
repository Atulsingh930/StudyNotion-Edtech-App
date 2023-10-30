import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { sendOtp } from '../../../services/operations/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSignUpDetails } from '../../../slices/authSlice';


function SignUpFrom() {

    const [toggle, settoggle] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setformData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
        accountType : toggle ? 'Student' : 'Instructor',
    })

    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    function changeHandler(event){
        const {name, value} = event.target
        setformData((prevData)=>({
            ...prevData,
            [name]  : value
        }))
    }

    function submitHandler(event){
        
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords are Different")
            return
        }else{
            dispatch(sendOtp(formData.email, navigate))
            dispatch(setSignUpDetails(formData));
            // toast.success("Logged in")
        }
    }
  return (
    <div className='w-full'>
        <div className='w-1/2 bg-[#161d29] rounded-3xl border-b-2 border-[#404650] p-0.5 my-6 overflow-x-hidden'>
            <button className={`w-1/2  text-base h-full rounded-3xl py-2 transition-all duration-200 ${toggle ? ("bg-[#000814] text-white") : ("text-[#889daa]")}`} onClick={()=>settoggle(true)}>
                Student
            </button>
            <button className={`w-1/2  text-base h-full rounded-3xl py-2 transition-all duration-200 ${!toggle ? ("bg-[#000814] text-white") : ("text-[#889daa]")}`} onClick={()=>settoggle(false)}>
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col gap-y-4 mt-3'>

            {/* first name and last name */}
            <div className='flex gap-5 box-border text-richblack-5 text-sm'>
                <label className='w-11/12 flex flex-col gap-[0.375rem]'>

                    <p className='text-richblack-5 text-sm'>First Name<sup className='text-pink-500 ml-1'>*</sup></p>

                    <input className='bg-[#161d29] py-2 rounded-md border-b-2 border-[#404650] placeholder:text-base w-full text-base pl-3'
                    type="text"
                    required
                    name='firstName'
                    placeholder='Enter First Name'
                    onChange={changeHandler}
                    value={formData.firstName} />

                </label>

                <label className='w-11/12 flex flex-col gap-[0.375rem]'>

                    <p className='text-richblack-5 text-sm'>Last Name<sup className='text-pink-500 ml-1'>*</sup></p>

                    <input className='bg-[#161d29] py-2 rounded-md border-b-2 border-[#404650] placeholder:text-base w-full text-base pl-3'
                    type="text"
                    required
                    name='lastName'
                    placeholder='Enter Last Name'
                    onChange={changeHandler}
                    value={formData.lastName} />

                </label>
            </div>

            <label className='flex flex-col gap-[0.375rem]'>

                <p className='text-sm'>Email Address<sup className='text-pink-500 ml-1'>*</sup></p>

                <input className='bg-[#161d29] py-2 rounded-lg border-b-2 border-[#404650] placeholder:text-lg text-lg w-full pl-3'
                type="email"
                required
                name='email'
                placeholder='Enter Email Address'
                onChange={changeHandler}
                value={formData.email} />

            </label>
            <div className='flex gap-5'>
                <label className='relative flex flex-col gap-[0.375rem]'>

                    <p className='text-sm'>Create Password<sup className='text-pink-500 ml-1'>*</sup></p>

                    <input className='bg-[#161d29] py-2 rounded-md border-b-2 border-[#404650] placeholder:text-base w-full text-base pl-3'
                    type={showPassword ? ("text") : ("password")}
                    required
                    name='password'
                    placeholder='Enter Password'
                    onChange={changeHandler}
                    value={formData.password} />
                    <span className='text-2xl absolute bottom-2 right-3 cursor-pointer'
                        onClick={()=>setshowPassword((prev)=>!prev)}>
                       {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>
                <label className='relative flex flex-col gap-[0.375rem]'>

                    <p className='text-sm'>Confirm Password<sup className='text-pink-500 ml-1'>*</sup></p>

                    <input className='bg-[#161d29] py-2 rounded-md border-b-2 border-[#404650] placeholder:text-base w-full text-base pl-3'
                    type={showConfirmPassword ? ("text") : ("password")}
                    required
                    name='confirmPassword'
                    placeholder='Enter Password'
                    onChange={changeHandler}
                    value={formData.confirmPassword} />
                    <span className='text-2xl absolute bottom-2 right-3 cursor-pointer'
                        onClick={()=>setshowConfirmPassword((prev)=>!prev)}>
                       {showConfirmPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>
            </div>

            <button className='bg-[#ffd60a] text-[#000814] text-lg py-2 rounded-md mt-6 w-full'>
                Create Account
            </button>

        </form>
    </div>
    

  )
}

export default SignUpFrom