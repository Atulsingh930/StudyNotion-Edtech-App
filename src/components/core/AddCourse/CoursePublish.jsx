import React, { useEffect, useState } from 'react'
import { HiMiniChevronLeft } from 'react-icons/hi2';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../utils/constants';
import { publishCourse } from '../../../services/operations/courseDetailsApi';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';


function CoursePublish() {

    const [loading, setLoading] = useState(false);
    const { getValues, setValue, register, handleSubmit, control} = useForm();
    const {courses, editCourse} = useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function goToCourses(){
        dispatch(resetCourseState());
        navigate('/dashboard/my-courses')
    }

    
    
    const onSubmit = async ()=>{
        if((courses.status === COURSE_STATUS.PUBLISHED) && (getValues('publishCourse') === true || courses.status === COURSE_STATUS.DRAFT) && getValues('publishCourse') === false){
            goToCourses();
            return
        }
        const formData = new FormData();
        formData.append('courseID', courses._id);
        if(getValues('publishCourse')){
            formData.append('status' , COURSE_STATUS.PUBLISHED);
        }else{
            formData.append('status' , COURSE_STATUS.DRAFT)
        }
        const result = await publishCourse(formData, token);
        if(!result){
            return;
        }
        goToCourses();
        setLoading(true);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-start gap-20'>
        <div className='w-full flex flex-col gap-[1.625rem] bg-richblack-800 border border-richblack-700 p-6 rounded-lg'>
            <p className='text-2xl text-richblack-5 font-semibold'>Publish Settings</p>
            <div className='flex items-center gap-2'>
            <Controller
                name="publishCourse"
                control={control}
                defaultValue={editCourse ? (courses?.status === COURSE_STATUS.PUBLISHED) : false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                      defaultChecked={editCourse ? (courses?.status === COURSE_STATUS.PUBLISHED) : false}
                        sx={{
                          color: '#585D69',
                          '&.Mui-checked': {
                            color: '#FFD60A',
                          },
                          borderRadius: '5rem',
                        }}
                        {...field}
                      />
                    }
                    label="Make this Course Public"
                  />
                )}
            />


                {/* <label htmlFor="publishCourse" className='text-richblack-400 font-medium'>Make this Course Public</label> */}
            </div>
        </div>
        <div className='flex justify-between w-full'>
            <button disabled={loading} type='button' onClick={()=>dispatch(setStep(2))} className='px-6 py-3 shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.10)_inset] bg-richblack-800 rounded-lg text-richblack-5 font-medium flex gap-2 items-center'>
                <HiMiniChevronLeft className='text-2xl'/>
                <p>Back</p>
            </button>
            <button disabled={loading} type='submit' className='px-6 py-3 shadow-[-2px_-2px_0px_0px_rgba(255,_255,_255,_0.51)_inset] bg-yellow-50 rounded-lg text-richblack-900 font-medium'>
                {editCourse ? 'Save Changes' : 'Save and Next'}
            </button>
        </div>
    </form>
  )
}

export default CoursePublish