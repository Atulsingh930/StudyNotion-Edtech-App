import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    userImage : localStorage.getItem('userImage')?JSON.parse(localStorage.getItem('userImage')) : null,
    loading : false,
}

const profleSlice = createSlice(
    {
        name : 'profile',
        initialState : intialState,
        reducers : {
            setUser : (state, value)=>{
                state.user = value.payload
                localStorage.setItem('user', JSON.stringify(value.payload))
            },
            setUserImage : (state, value)=>{
                state.userImage = value.payload
                localStorage.setItem('userImage', JSON.stringify(value.payload))
            },
            setLoading : (state, value)=>{
                state.user = value.payload
            }
        }
    }
);

export const {setUser,setUserImage, setLoading} = profleSlice.actions;
export default profleSlice.reducer;