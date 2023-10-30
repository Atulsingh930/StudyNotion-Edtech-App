import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../services/operations/courseDetailsApi';
import { setCourses } from '../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import CourseThumbnailPreview from '../CourseInformation/CourseThumbnailPreview';

function SubSectionModal({modalData, add=false, view=false, edit=false, setModalData}) {

    const dispatch = useDispatch();
    const {courses} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);


    const {register, setValue, getValues, handleSubmit, formState : {errors}} = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(view || edit){
            setValue('lectureTitle', modalData.title);
            // setValue('lectureTimeDuration', modalData.timeDuration);
            setValue('lectureDescription', modalData.description);
            // setValue('lectureVideoFile', modalData.videoUrl)
        }
    }, [])
    
    async function handleEditSubSection(){
        const currentvalues = getValues();
        const formData = new FormData();
        formData.append('courseID', courses._id);
        formData.append('subSectionID', modalData.subSectionID);
        if(currentvalues.lectureTitle!==modalData.title){
            formData.append('title', currentvalues.lectureTitle)
        }if(currentvalues.lectureDescription!==modalData.description){
            formData.append('description', currentvalues.lectureDescription)
        }if(currentvalues.lectureVideoFile!==modalData.videoUrl){
            formData.append('videoFile', currentvalues.lectureVideoFile)
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if(result){
            dispatch(setCourses(result))
        }setModalData(null);
        setLoading(null);
    }

    function isFormUpdated(){
        const currentValue = getValues();
        if(currentValue.title!==modalData.title || currentValue.timeDuration !== modalData.timeDuration || currentValue.description !== modalData.description || currentValue.videoFile !== modalData.videoFile){
            return true;
        }else{
            return false;
        }
    }

    async function onSubmit(data){
        try{
            setLoading(true);
        if(view){
            return;
        }if(edit){
            if(!isFormUpdated()){
                toast.error('No changes are to Edit');
            }else{
                handleEditSubSection(data);
            }return;
        }
        if(add){
            const formData = new FormData();
            formData.append('courseID', courses._id)
            formData.append('sectionID', modalData);
            formData.append('title', data.lectureTitle)
            formData.append('description', data.lectureDescription)
            formData.append('videoFile', data.lectureVideoFile);

            const result = await createSubSection(formData, token);
            if(result){
                dispatch(setCourses(result));
            }setModalData(null)
            setLoading(false);
        }
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div>
        <div className='w-11/12 max-w-[41.5625rem] rounded-lg border border-richblack-400 bg-richblack-800 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-end overflow-y-auto'>
            <div className='w-full flex justify-between items-center px-6 py-4 bg-richblack-700'>
                <p className='text-lg font-semibold text-white'>{(add && 'Adding') || (edit && 'Editing') || (view && 'Viewing')} Lecture</p>
                <RxCross1 onClick={()=>!loading && setModalData(null)} className='cursor-pointer text-richblack-5 font-semibold'/>
            </div>
            <div className='overflow-y-auto max-h-[85vh] w-full flex flex-col items-end'>
                <form onSubmit={handleSubmit(onSubmit)} className='p-8 flex flex-col items-start gap-6 w-full'>
                    <CourseThumbnailPreview errors={errors} getValue={getValues} setValue={setValue} register={register} name={'lectureVideoFile'} width={'36rem'} title={'Lecture Video'} video={true} add={add} view={view} edit={edit} videoUrl={modalData}/>
                    <label className='w-full flex flex-col gap-[0.375rem]'>
                        <p className='text-sm text-richblack-5'>lectureTitle<sup className='text-pink-200'>*</sup></p>
                        <input
                        disabled={view}
                        id='lectureTitle'
                        type="text"
                        {...register('lectureTitle',{required : true})}
                        placeholder='Enter Lecture Title'
                        className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
                        {
                            errors.lectureTitle && (
                                <span>Lecture Title is required</span>
                            )
                        }

                    </label>

                    <label className='w-full flex flex-col gap-[0.375rem]'>
                        <p className='text-sm text-richblack-5'>Lecture Description<sup className='text-pink-200'>*</sup></p>
                        <textarea
                        disabled={view}
                        name="lectureDescription"
                        id="lectureDescription"
                        {...register('lectureDescription',{required : true})}
                        placeholder='Enter Lecture Description'
                        cols="30"
                        rows="2"
                        className='w-full p-3 bg-richblack-700 rounded-lg border-b-2 border-richblack-500' />
                        {
                            errors.courseShortDecs && (
                                <span>Course Description is required</span>
                            )
                        }
                    </label>

                    {
                        !view && (
                            <div className='flex justify-end w-full'>
                                <button disabled={loading} type='submit' className='text-richblack-900 font-medium px-6 py-3 bg-yellow-50 rounded-lg flex gap-3 items-center'>
                                    {edit ? 'Save Changes' : 'Save'}
                                </button>
                            </div>
                        )
                    }
                </form>
            </div>
        </div>

        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over'></div>
    </div>
  )
}

export default SubSectionModal