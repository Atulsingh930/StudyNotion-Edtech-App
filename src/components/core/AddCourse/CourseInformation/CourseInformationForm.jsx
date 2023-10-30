import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createCourse, editCourseDetails, fetchAllCategory } from '../../../../services/operations/courseDetailsApi';
import { useDispatch, useSelector } from 'react-redux';
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import Requiermentfeilds from './Requiermentfeilds';
import CourseThumbnailPreview from './CourseThumbnailPreview';
import CourseTagsChips from './CourseTagsChips';
import { setCourses, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';

function CourseInformationForm({}) {

    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([])
    const dispatch = useDispatch()
    const {token} = useSelector((state)=>state.auth)
    const {courses, editCourse} = useSelector((state)=>state.course);
    const {setValue, register, handleSubmit, getValues, formState : {errors}} = useForm();
    async function getAllCategories(){
        setLoading(true);
        try{
            const response = await fetchAllCategory();
            setCategoriesData(response)
        }catch(error){
            console.log('Error while fetching categories');
            console.log(error);
        }
        setLoading(false);
    }


    useEffect(() => {
    getAllCategories()
        if(editCourse){
            setValue('courseName', courses?.courseName)
            setValue('courseShortDecs', courses?.courseDescription)
            setValue('courseBenifits', courses?.WhatYouWillLearn)
            setValue('coursePrice', courses?.price)
            setValue('coursecategory', courses?.category._id)
            setValue('courseTag', courses?.tag)
            setValue('courseThumbnail', courses?.thumbnail)
            setValue('courseRequierment', courses?.instructions)
        }
    
    }, [])
    

    
    function isFormUpdated(){
        const currentValues = getValues()

        if(currentValues.courseName!==courses.courseName || currentValues.courseShortDecs!==courses.courseDescription || currentValues.courseBenifits!==courses.WhatYouWillLearn || currentValues.coursePrice!==courses.price || currentValues.coursecategory._id!==courses.category._id || currentValues.courseTag.toString()!==courses.tag.toString() || currentValues.courseThumbnail!==courses.thumbnail || currentValues.courseRequierment.toString()!==courses.instructions.toString())
            return true;
        else
            return false
    }
    // console.log(categoriesData[0].name);
    async function onsubmit(data){
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                console.log(currentValues);
                const formData = new FormData();
                formData.append('courseId', courses._id)
                if(data.courseName!==courses.courseName){
                    formData.append('courseName', data.courseName)
                }
                if(data.courseShortDecs!==courses.courseDescription){
                    formData.append('courseDescription', data.courseShortDecs)
                }
                if(data.courseBenifits!==courses.WhatYouWillLearn){
                    formData.append('WhatYouWillLearn', data.courseBenifits)
                }
                if(data.coursePrice!==courses.price){
                    formData.append('price', data.coursePrice)
                }
                if(data.coursecategory!==courses.category){
                    formData.append('category', data.coursecategory)
                }
                if(JSON.stringify(data.courseTag)!==JSON.stringify(courses.tag)){
                    formData.append('tag',data.courseTag)
                }
                if(data.courseThumbnail!==courses.thumbnail){
                    formData.append('thumbnail', data.courseThumbnail)
                }
                if(JSON.stringify(data.courseRequierment)!==JSON.stringify(courses.instructions)){
                    formData.append('instructions', data.courseRequierment)
                }

                setLoading(true);
                const response = await editCourseDetails(formData, token);
                setLoading(false);
                if(response){
                    dispatch(setStep(2));
                    dispatch(setCourses(response))
                }
            }else{
                toast.error('No Changes are made to Update')
            }return
        }
        console.log(data.courseTag);
        // return;
        const formData = new FormData();
        formData.append('courseName', data.courseName)
        formData.append('courseDescription', data.courseShortDecs)
        formData.append('WhatYouWillLearn', data.courseBenifits)
        formData.append('price', data.coursePrice)
        formData.append('category', data.coursecategory)
        formData.append('tag', data.courseTag)
        formData.append('thumbnailImage', data.courseThumbnail)
        formData.append('instructions', data.courseRequierment)

        setLoading(true);
        const response = await createCourse(formData, token);
        if(response){
            dispatch(setStep(2));
            dispatch(setCourses(response))
        }
        setLoading(false);
    }

  return (
    loading ? (<div></div>) : (
        <form onSubmit={handleSubmit(onsubmit)} className='mb-20 flex flex-col gap-10 items-end transition-all duration-300'>
            <div className='w-full p-6 bg-richblack-800 border border-richblack-700 rounded-lg flex flex-col gap-[1.625rem]'>
            <label className='flex flex-col gap-[0.375rem]'>
                <p className='text-sm text-richblack-5'>Course Title<sup className='text-pink-200'>*</sup></p>
                <input
                id='courseName'
                type="text"
                {...register('courseName',{required : true})}
                placeholder='Enter Course Title'
                className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
                {
                    errors.courseName && (
                        <span>Course Title is required</span>
                    )
                }

            </label>
            
            <label className='flex flex-col gap-[0.375rem]'>
                <p className='text-sm text-richblack-5'>Course Short Description<sup className='text-pink-200'>*</sup></p>
                <textarea
                name="courseShortDecs"
                id="courseShortDecs"
                {...register('courseShortDecs',{required : true})}
                placeholder='Enter Description'
                cols="30"
                rows="4"
                className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
                {
                    errors.courseShortDecs && (
                        <span>Course Description is required</span>
                    )
                }
            </label>

            <label className='flex flex-col gap-[0.375rem] relative '>
                <p className='text-sm text-richblack-5'>Price<sup className='text-pink-200'>*</sup></p>
                <div className='absolute top-[2.4rem] left-2 text-[1.375rem] text-richblack-500'><HiOutlineCurrencyRupee/></div>
                <input
                id='coursePrice'
                type="text"
                {...register('coursePrice',{required : true})}
                placeholder='Enter Price'
                className='w-full pl-8 p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
                {
                    errors.coursePrice && (
                        <span>Course Price is required</span>
                    )
                }
            </label>

            <label className='flex flex-col gap-[0.375rem]'>
                <p className='text-sm text-richblack-5'>Category<sup className='text-pink-200'>*</sup></p>
                <select name='coursecategory' className='w-full p-3 flex flex-col gap-5 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' defaultValue={'none'} {...register('coursecategory', { required: true })}>
                    <option disabled value="none">Choose a Category</option>
                    {categoriesData.map((category, index) => (
                        <option className='py-5' key={index} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                    </select>

                {
                    errors.coursecategory && (
                        <span>Course Description is required</span>
                    )
                }
            </label>

            <CourseTagsChips name={'courseTag'} setValue={setValue} tagData={courses?.tag} errors={errors} register={register}/>
            
            <CourseThumbnailPreview name={'courseThumbnail'} setValue={setValue} getValue={getValues} errors={errors} register={register} title={'Course Thumbnail'} editCourse courseImg={courses?.thumbnail}/>

            <label className='flex flex-col gap-[0.375rem]'>
                <p className='text-sm text-richblack-5'>Benefits of the course<sup className='text-pink-200'>*</sup></p>
                <textarea
                name="courseBenifits"
                id="courseBenifits"
                cols="30"
                rows="4"
                placeholder='Enter of Benefits of Course'
                {...register('courseBenifits', {required : true})}
                className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500'/>
                {
                    errors.courseBenifits && (
                        <span>Course Beneifts is required</span>
                    )
                }
            </label>

            <Requiermentfeilds name={'courseRequierment'} label={''} register={register} errors={errors} setValue={setValue} reqData={courses?.instructions}/>
            </div>
            
            <div className='flex gap-4'>          
                <button type='submit' className='bg-yellow-50 py-3 px-6 rounded-lg flex justify-center items-center shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] text-richblack-900 transition-all duration-200 hover:scale-95'>
                    {
                        editCourse ? 'Continue with Saving' : 'Next'
                    }
                </button>
                {
                    editCourse && (
                        <button onClick={()=>dispatch(setStep(2))} className='bg-richblack-700 py-3 px-6 rounded-lg flex justify-center items-center shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] text-richblack-5 transition-all duration-200 hover:scale-95'>
                            Continue without Saving
                        </button>
                    )
                }
                
            </div>


        </form>
    )
  )
}

export default CourseInformationForm