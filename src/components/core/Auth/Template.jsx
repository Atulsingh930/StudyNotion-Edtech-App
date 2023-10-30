import React from 'react'
import SignUpFrom from './SignUpFrom';
import LoginForm from './LoginForm';
import Frame from '../../../assets/Images/frame.png';
import { FcGoogle } from "react-icons/fc";
import { useSelector } from 'react-redux';

function Template({title ,desc1 ,desc2 ,image ,formType}) {
    const {loading} = useSelector((state)=>state.auth)
  return (
    <div className='w-full flex justify-center font-inter'>
        {
            loading ? (<div className='loader'></div>) : (
            <div className='flex justify-between w-11/12 max-w-[1160px] py-12'>
                <div className='text-white max-w-[450px] w-11/12'>
                    <h1 className='font-semibold text-[1.9rem] leading-10 mb-4'>{title}</h1>
                    <p>
                        <span className='text-[#afb2bf] text-lg'>{desc1}</span><br />
                        <span className='italic text-[#47a5c5] text-lg leading-3'>{desc2}</span>
                    </p>
                    {formType ==="signup"? (<SignUpFrom />) : (<LoginForm/>)}
    
                    <div className='flex justify-center items-center mt-5'>
                        <div className='bg-[#2c333f] h-[1px] rounded-lg w-6/12'></div>
                        <p className='px-2 text-sm text-[#2c333f]'>OR</p>
                        <div className='bg-[#2c333f] h-[1px] w-6/12'></div>
                    </div>
                    <button className='text-[#9fb2bf] text-[1rem] font-semibold flex justify-center items-center w-full py-2 border border-[#2c333f] rounded-lg mt-7'><FcGoogle className='mr-2 text-xl'/> Sign in with Google</button>
                </div>
    
                <div className='relative w-11/12 max-w-[450px]'>
                    <img src={image} alt="" width={558} height={590} loading='lazy' className='absolute z-10 right-4 -top-4'/>
                    <img src={Frame} alt="" width={558} height={504} loading='lazy' className='absolute'/>
                </div>
            </div>
            )
        }
    </div>
  )
}

export default Template