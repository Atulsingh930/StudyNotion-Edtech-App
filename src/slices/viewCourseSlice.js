import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    courseSectionData : null,
    entireCoureData : null,
    completedLecture : null,
    ratingAndReview : null,
    currentVideoLink : null,
    courseProgressDetails : null,
    totalNoOfLecture : 0
}

const viewCourseSlice = createSlice(
    {
        name : 'viewCourse',
        initialState : intialState,
        reducers : {
            setCourseSectionData : (state, action)=>{
                state.courseSectionData = action.payload
            },
            setntireCoureData : (state, action)=>{
                state.entireCoureData = action.payload
            },
            setCompletedLecture : (state, action)=>{
                state.completedLecture = action.payload
            },
            setCurrentVideoLink : (state, action)=>{
                state.currentVideoLink = action.payload
            },
            setRatingReview : (state, action)=>{
                state.ratingAndReview = action.payload
            },
            setCourseProgressDetails : (state, action)=>{
                state.courseProgressDetails = action.payload
            },
            setTotalNoOfLecture : (state, action)=>{
                state.totalNoOfLecture = action.payload
            }
        }
    }
)

export const {setCompletedLecture, setCourseSectionData, setTotalNoOfLecture, setntireCoureData, setCurrentVideoLink, setCourseProgressDetails, setRatingReview} = viewCourseSlice.actions;
export default viewCourseSlice.reducer