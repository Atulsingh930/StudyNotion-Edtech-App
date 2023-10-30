import React from 'react'
import { useSelector } from 'react-redux'
import CartCardList from './CartCardList'
import CheckOutBox from './CheckOutBox'

function Cart() {

    const {totalIteam, totalPrice} = useSelector((state)=>state.cart);

  return (
    <div className='w-full flex flex-col items-start'>
        {/* <div className='p-6'>
            <div className='flex items-center gap-2 text-sm text-richblack-300'>
                <p>Home</p>
                <p>/</p>
                <p>Dashboard</p>
                <p>/</p>
                <p className='text-yellow-50 font-medium'>Wishlist</p>
            </div>
            <p className='text-3xl text-richblack-5 font-medium'>My Wishlist</p>
        </div> */}
        <p className='ml-6 text-richblack-400 font-semibold'>{`${totalIteam} Courses in Wishlist`}</p>
        {
            totalIteam<=0 ? (<div className='w-full flex justify-center text-3xl border-t border-richblack-400 ml-6 text-richblack-300 font-medium'><p className='mt-10'>Your cart is empty</p></div>) : (
                <div className='w-full flex gap-6 items-start border-t border-richblack-400 ml-6'>
                    <CartCardList/>
                    <CheckOutBox totalPrice={totalPrice}/>
                </div>
            )
        }
    </div>
  )
}

export default Cart