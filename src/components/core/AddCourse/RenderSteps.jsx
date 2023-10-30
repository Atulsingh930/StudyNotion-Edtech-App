import React from 'react'
import { BsCheckLg } from 'react-icons/bs'
import {  useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm'
import CoursePublish from './CoursePublish'

function RenderSteps() {

    const {step} = useSelector((state)=>state.course)

    const steps = [
        {
            id : 1,
            title : 'Course Information'
        },
        {
            id : 2,
            title : 'Course Builder'
        },
        {
            id : 3,
            title : 'Publish'
        },
    ]

  return (
    <div className='text-white w-[41.125rem] flex flex-col gap-6'>
        <div className='flex flex-col items-center gap-3 justify-center w-full'>
            <div className='flex justify-center w-full'>
                {
                    steps.map((value)=>(
                        <>
                            <div className={`p-[0.4375rem] text-xl rounded-full border ${value.id<step ? 'bg-yellow-50 text-richblack-900' : value.id===step ? 'bg-yellow-900 text-yellow-50 border-yellow-50' : 'bg-richblack-800 border-richblack-700 text-richblack-300'}`}>
                                {
                                    <p className='h-6 w-6 flex justify-center items-center'>{value.id<step ? <BsCheckLg/>: `${value.id}`}</p>
                                }
                            </div>
                            {value.id<=steps.length-1 && (<div className={`h-[calc(2.375rem/2)] w-[12.5rem]  border-b-2 ${value.id<step ? 'border-yellow-50' : 'border-richblack-700'} border-dashed`}></div>)}
                        </>
                    ))
                }
            </div>
            <div className='flex justify-center gap-[7rem] w-full'>
                {
                    steps.map((value)=>(
                        <div className='min-w-[130px] flex flex-col items-center'>
                            <p className='text-sm text-richblack-5'>{value.title}</p>
                        </div>    
                    ))
                }
            </div>

        </div>
        {
            step===1 && (<CourseInformationForm/>)
        }
        {
            step === 2 && (<CourseBuilderForm/>)
        }
        {
            step === 3 && (<CoursePublish/>)
        }
    </div>
  )
}

export default RenderSteps