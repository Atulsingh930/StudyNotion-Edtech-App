import React from 'react'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'


function CartCardList() {

    const {cartIteams ,totalIteam} = useSelector((state)=>state.cart)

  return (
    <div className='flex flex-col'>
        {
            cartIteams.map((iteam, index)=>(
                <CartCard iteam={iteam} index={index} totalIteam={totalIteam}/>
            ))
        }
    </div>
  )
}

export default CartCardList