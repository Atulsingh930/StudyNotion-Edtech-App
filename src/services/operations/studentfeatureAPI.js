import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnect } from "../apiConnector";
import rzPayLogo from '../../assets/Images/rzp.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API , SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(courses, token, userDetails, navigate, dispatch){
    const toastID = toast.loading('Loading...');
    try{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res){
            toast.error('RazorPay SDK Failed to Load');
            return;
        }

        const orderRespone = await apiConnect('POST', COURSE_PAYMENT_API, {courses}, {
            Authorization: `Bearer ${token}`
        })
        if(!orderRespone.data.success){
            throw new Error(orderRespone.data.message);
        }
        // console.log(orderRespone, 'orderRespone')
        const options = {
            key : process.env.REACT_APP_RAZORPAY_KEY,
            amount : orderRespone.data.amount,
            currency : orderRespone.data.currency,
            name : 'StudyNotion',
            description : 'Thank You for purchasing the course',
            image : rzPayLogo,
            order_id : orderRespone.data.orderID,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
                contact : userDetails.additionalDetails.contactNumber
            },
            handler : function(response){
                // console.log(response, 'response')
                sendPaymentSuccessEmail(response, orderRespone.data.amount, token)
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function(response){
            toast.error('Oops, Payment Failed');
            // console.log(response.data.message)
        })

        // console.log('payment complete')
    }catch(error){
        // console.log('PAYMENT API ERROR', error)
        toast.error('Error while Buying Course')
    }toast.dismiss(toastID)
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        // console.log(response)
        // console.log('paymentsuccessfyllu started')
        await apiConnect('POST', SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount
        }, {Authorization: `Bearer ${token}`})
    }catch(error){
        // console.log('SEND_PAYMENT_SUCCESS_EMAIL_API ERROR', error)
        toast.error('Error while sending mail of payment successfull')
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch ){
    const toastID = toast.loading('Verifying Payment...');
    dispatch(setPaymentLoading(true));
    try{
        // console.log(bodyData, 'bodyData')
        const response = await apiConnect('POST', COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        // console.log("COURSE_VERIFY_API API RESPONSE............", response.data.data)
        toast.success('Payment Successfull, you are Enrolled in Course');
        dispatch(resetCart());
        dispatch(setUser(response.data.data))
        navigate('/dashboard/enrolled-courses')
    }catch(error){
        // console.log('COURSE_VERIFY_API ERROR', error)
        toast.error('Error while Verifying payment successfull')
    }
    toast.dismiss(toastID);
    dispatch(setPaymentLoading(false));

}