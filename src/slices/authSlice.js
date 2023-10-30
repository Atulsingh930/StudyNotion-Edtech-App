import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    token : localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    loading : false,
    signUpData : null
}

const authSlice = createSlice(
    {
        name : 'auth',
        initialState : intialState,
        reducers : {
            setToken : (state, value)=>{
                state.token = value.payload
            },
            setLoading : (state, value)=>{
                state.loading = value.payload
            },
            setSignUpDetails : (state, value)=>{
                state.signUpData = value.payload
            }
        }
    }
);

export const {setToken, setLoading, setSignUpDetails} = authSlice.actions;
export default authSlice.reducer;