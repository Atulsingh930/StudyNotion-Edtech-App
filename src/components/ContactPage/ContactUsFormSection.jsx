import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { apiConnect } from '../../services/apiConnector'; 
import { contactUsendPoint } from '../../services/api';
import CountryCode from '../../data/countrycode.json'

function ContactUsFormSection() {

    const [loading, setLoading] = useState(false);

    async function submitHandler(data){
        const {firstName, lastName, email, phoneNo,countryCode, message} = data
        setLoading(true);
        try{
            const response = await apiConnect('POST', contactUsendPoint.CONTACT_US_API, {firstName, lastName, email, phoneNo, countryCode, message})
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    const {reset, register, handleSubmit, formState : {errors, isSubmitSuccessful}} = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                firstName : "",
                lastName : "",
                email : "",
                phoneNo : "",
                message : "",
                countryCode : ""
            })
        }
    }, [isSubmitSuccessful, reset])
    

  return (
    <>
        <SkeletonTheme baseColor="#2C333F" highlightColor="#6E727F">
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5 w-full'>
                <div className='flex gap-5 justify-center w-full'>
                    <label className='flex flex-col gap-[0.375rem] w-full'>
                        <p className='text-sm text-richblack-5'>{loading ? <Skeleton/> : 'First Name'}</p>
                        {
                            loading ? <Skeleton height={45}/> : <input className='w-full shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset] p-3 bg-richblack-800 rounded-lg' {...register("firstName", { required: true })} placeholder='Enter First Name' type="text" name="firstName"/>
                        }
                        {
                            errors.firstName && <span>First name is requiered</span>
                        }
                    </label>
                    <label className='flex flex-col gap-[0.375rem] w-full'>
                        <p className='text-sm text-richblack-5'>{loading ? <Skeleton/> : 'Last Name'}</p>
                        {
                            loading ? <Skeleton height={45}/> : <input className='w-full shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset] p-3 bg-richblack-800 rounded-lg' {...register("lastName")} placeholder='Enter Last Name' type="text" name="lastName"/>
                        }
                    </label>
                </div>
                <div>
                    <label className='flex flex-col gap-[0.375rem]'>
                        <p className='text-sm text-richblack-5'>{loading ? <Skeleton/> : 'Email Address'}</p>
                        {
                            loading ? <Skeleton height={45}/> : <input className='w-full shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset] p-3 bg-richblack-800 rounded-lg' {...register("email", { required: true })} placeholder='Enter Email Address' type="email" name="email"/>
                        }
                    </label>
                </div>
                <div>
                    <div>
                        <label className='flex flex-col gap-[0.375rem]'>
                            <p className='text-sm text-richblack-5'>{loading ? <Skeleton/> : 'Phone Number'}</p>
                            <div className='flex gap-5 w-full'>
                                {
                                    loading ? <Skeleton width={81} height={45}/> :                                 
                                    <select type="text" name="countrycode" id="countryCode" className="form-style w-[5.0625rem]" {...register("countryCode", { required: true })} defaultValue={'+91'}>
                                        {CountryCode.map((item, index) => {
                                          return (
                                            <option key={index}  value={item.code}>
                                              {item.code} - {item.country}
                                            </option>
                                          );
                                        })}
                                    </select>
                                }
                                {
                                    loading ? <Skeleton width={435} height={45}/> : <input className='w-full shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset] p-3 bg-richblack-800 rounded-lg' {...register("phoneNo", { required: true })} placeholder='Enter Phone Number' type="text" name="phoneNo" />
                                }
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    <label className='flex flex-col gap-[0.375rem]'>
                        <p className='text-sm text-richblack-5'>{loading ? <Skeleton/> : 'Message'}</p>
                        {
                            loading ? <Skeleton height={120}/> : <textarea className='w-full shadow-[0px_-1px_0px_0px_rgba(255,_255,_255,_0.18)_inset] p-3 bg-richblack-800 rounded-lg' name="message" id="" cols="30" rows="5" {...register("message", { required: true })} placeholder='Enter Your Message'></textarea>
                        }
                    </label>
                </div>
                <button className='px-5 py-3 w-full flex gap-2 text-center justify-center bg-yellow-50 text-richblack-900 font-medium text-base rounded-lg drop-shadow-xl transition-all duration-200 hover:scale-95 btnShadow'>
                    Send Message
                </button>
            </form>
        </SkeletonTheme>
    </>
  )
}

export default ContactUsFormSection