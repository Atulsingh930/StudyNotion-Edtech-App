import React from 'react'
import { buyCourse } from '../../../services/operations/studentfeatureAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CheckOutBox({totalPrice}) {
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {cartIteams} = useSelector((state)=>state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleBuyButton(){
    if(token){
        buyCourse([...cartIteams], token, user, navigate, dispatch);
        return;
    }
}
  return (
    <div className='w-[17.625rem] p-6 flex flex-col gap-4 bg-richblack-800 mt-6 border border-richblack-700 rounded-lg'>
        <div className='flex flex-col gap-1 items-start'>
            <p className='text-richblack-200 font-semibold text-sm'>Total:</p>
            <p className='text-yellow-50 font-semibold text-2xl'>Rs. {totalPrice.toLocaleString('en-IN')}</p>
            <p className='text-richblack-300 text-sm line-through'>Rs. {(totalPrice+1000).toLocaleString('en-IN')}</p>
        </div>
        <button onClick={handleBuyButton} className='w-full px-6 py-3 text-center bg-yellow-50 rounded-lg text-richblack-900'>
            Buy Now
        </button>
    </div>
  )
}

export default CheckOutBox