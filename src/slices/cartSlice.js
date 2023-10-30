import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const intialState = {
    cartIteams : localStorage.getItem('cartIteams') ? JSON.parse(localStorage.getItem('cartIteams')) : [],
    totalIteam : localStorage.getItem('totalIteam') ? JSON.parse(localStorage.getItem('totalIteam')) : 0,
    totalPrice : localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0
}
const cartSlice = createSlice(
    {
        name : 'cart',
        initialState : intialState,
        reducers : {
            addToCart : (state, action)=>{
                const course = action.payload;
                const index = state.cartIteams.findIndex((iteam)=>iteam._id === course._id)
                console.log(index)
                if(index > 0){
                    toast.error('Iteam already exits in Cart')
                    return
                }

                state.cartIteams.push(course);
                ++state.totalIteam;
                state.totalPrice+=course.price

                localStorage.setItem('cartIteams', JSON.stringify(state.cartIteams));
                localStorage.setItem('totalIteam', JSON.stringify(state.totalIteam));
                localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));

                toast.success('Course added to cart successfully')
            },
            removeFromCart : (state, action)=>{
                const course = action.payload;
                const index = state.cartIteams.findIndex((iteam)=>iteam._id === course._id)

                if(index >= 0){
                    state.cartIteams.splice(index, 1);
                    --state.totalIteam;
                    state.totalPrice-=course.price
    
                    localStorage.setItem('cartIteams', JSON.stringify(state.cartIteams));
                    localStorage.setItem('totalIteam', JSON.stringify(state.totalIteam));
                    localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
    
                    toast.success('Course added to cart successfully')
                }
            },
            resetCart : (state)=>{
                state.cartIteams = [];
                state.totalIteam = 0;
                state.totalPrice = 0;
            }
        }
    }
);

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer