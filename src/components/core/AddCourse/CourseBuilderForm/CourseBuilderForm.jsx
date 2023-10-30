import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { setCourses, setEditCourse, setStep } from '../../../../slices/courseSlice';
import {IoIosAddCircleOutline} from 'react-icons/io'
import NestedView from './NestedView';
import { AiOutlineRight } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/operations/courseDetailsApi';

function CourseBuilderForm() {

    const {setValue, register, handleSubmit, formState : {errors}} = useForm()
    const {courses} = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    dispatch(setStep(2))
    dispatch(setCourses(courses))
    const [editSectionName, setEditSectionName] = useState('');
    const [loading, setLoading] = useState(false);

    function handleEditSectionName(sectionID, sectionName){
        if(editSectionName===sectionID){
            setEditSectionName(null);
            setValue('sectionName', '');
            return;
        }setEditSectionName(sectionID);
        setValue('sectionName', sectionName)
    }

    function cancelEditSection(){
        setEditSectionName(false);
        setValue('sectionName', "");
    }

    function goNext(){
        if(courses.courseContent.length===0){
            toast.error('Please add atleast one section')
            return
        }
        if(courses.courseContent.some((section)=>section.subSection.length===0)){
            toast.error('Please add atleast one subsection')
            return
        }
        dispatch(setStep(3))
    }

    function goBack(){
        dispatch(setEditCourse(true))
        dispatch(setStep(1))
    }

    async function onSubmit(data){
        setLoading(true);
        let result;

        if(editSectionName){
            result = await updateSection(
                {
                    sectionName : data.sectionName,
                    sectionID : editSectionName,
                    courseID : courses._id
                },token
            )
            if(result){
                setEditSectionName(null);
            }
        }else{
            result = await createSection(
                {
                    sectionName : data.sectionName,
                    courseID : courses._id
                },token
            )
        }
        setLoading(false);
        dispatch(setCourses(result))
        setValue('sectionName', '');
    }

  return (
    <div className='w-full flex flex-col items-start gap-[1.625rem] p-6 bg-richblack-800 border border-richblack-700 rounded-lg mb-80'>
        <p className='text-2xl font-medium'>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-start gap-[1.625rem]'>
            <label className='w-full flex flex-col gap-2'>
                <p className='font-medium text-richblack-5'>Section Name<sup className='text-pink-200'>*</sup></p>
                <input type="text" 
                placeholder='Add a section to build your course'
                className='w-full p-3 bg-richblack-700 border-b-2 border-richblack-500 rounded-lg'
                id='sectionName'
                {...register('sectionName', {required : true})}/>
            </label>
            <div className='flex gap-5'>
                <button type='submit' className='text-yellow-50 font-medium px-6 py-3 border border-yellow-50 rounded-lg flex gap-3 items-center'>
                    <IoIosAddCircleOutline className='text-yellow-50 text-lg font-medium'/>
                    {!editSectionName ? 'Create Section' : 'Edit Section Name'}
                </button>
                {
                    editSectionName && (
                        <button onClick={cancelEditSection} className='underline text-richblack-500'>
                            Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>
        {
            !loading && courses?.courseContent?.length > 0 && (
                <NestedView loading={loading} handleEditSectionName={handleEditSectionName}/>
            )
        }
        <div className='flex gap-5'>
            <button onClick={goNext} className='py-3 px-6 flex items-center gap-2 rounded-lg shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] bg-yellow-50 transition-all duration-150 hover:scale-95 text-richblack-900'>
                <p>Next</p>
                <AiOutlineRight className='text-sm font-semibold'/>
            </button>
            <button onClick={goBack} className='py-3 px-6 flex gap-2 rounded-lg shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] bg-richblack-700 transition-all duration-150 hover:scale-95 justify-center items-center'>
                Back
            </button>
        </div>
    </div>
  )
}

export default CourseBuilderForm