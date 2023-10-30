import React from 'react'
import Button from '../HomePage/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/operations/authApi';


function LogoutPage({setVisible}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logoutHandler(){
        dispatch(logout(navigate))
    }
    function cancelLogout(){
        setVisible(false);

    }
  return (
    <div className='w-11/12 max-w-[350px] p-6 bg-richblack-700 border border-richblack-400 rounded-lg mb-40 fixed'>
        <p className='text-2xl text-richblack-5 font-semibold'>Are you sure?</p>
        <p className='text-richblack-200 mt-3 mb-6'>You will be logged out of your account.</p>
        <div className='flex gap-4 text-lg font-semibold'>
            <Button clickHandler={logoutHandler} text={'Logout'} active={true}/>
            <Button clickHandler={cancelLogout} text={'Cancel'} active={false}/>
        </div>
    </div>
  )
}

export default LogoutPage