import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step : 1,
    courses : null,
    
    editCourse : false,
    paymentLoading : false,
    loading : false,
}

const CourseSlice = createSlice(
    {
        name : 'course',
        initialState,
        reducers : {
            setStep : (state, action)=>{
                state.step = action.payload
            },
            setLoading : (state, action)=>{
                state.loading = action.payload
            },
            setCourses : (state, action)=>{
                state.courses = action.payload
            },
            setEditCourse : (state, action)=>{
                state.editCourse = action.payload
            },
            setPaymentLoading : (state, action)=>{
                state.paymentLoading = action.payload
            },

            resetCourseState : (state)=>{
                state.courses = null;
                state.editCourse = false;
                state.step = 1;
            },
        }
    }
)

export const {resetCourseState,setLoading, setEnrolledCourse, setCourses, setEditCourse, setPaymentLoading, setStep} = CourseSlice.actions;
export default CourseSlice.reducer;
