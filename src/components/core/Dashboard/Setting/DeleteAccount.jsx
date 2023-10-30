import React from 'react'
import { deleteAccount } from '../../../../services/operations/profileApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdTrash } from 'react-icons/io';

function DeleteAccount() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    function handleDeleteAccount(){
        deleteAccount(token, navigate, dispatch)
    }

  return (
    <div className='w-full p-6 flex gap-[1.195rem] justify-between items-start bg-pink-900 rounded-lg border border-pink-700'>
        <div className='p-[0.875rem] text-2xl bg-pink-700 rounded-full text-pink-100'>
            <IoMdTrash/>
        </div>
        <div className='pr-[9rem] flex flex-col gap-1'>
            <p className='text-lg font-bold text-pink-5'>Delete Account</p>
            <div className='flex flex-col gap-0.5 text-sm text-pink-25 font-medium -tracking-tight'>
                <p>Would you like to delete account?</p>
                <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            </div>
            <p onClick={handleDeleteAccount} className='text-pink-300 font-medium italic cursor-pointer'>I want to delete my account.</p>
        </div>
    </div>
  )
}

export default DeleteAccount