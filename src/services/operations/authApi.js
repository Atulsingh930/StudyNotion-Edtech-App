import { setLoading, setToken } from "../../slices/authSlice";
import { setUser, setUserImage } from "../../slices/profileSlice";
import { endpoints } from "../api";
import { apiConnect } from "../apiConnector";
import toast from "react-hot-toast";

// RESETPASSWORD_API,

const{LOGIN_API, RESETPASSWORDTOKEN_API, SENDOTP_API, RESETPASSWORD_API, SIGNUP_API} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
      // const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnect("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        // dispatch(setProgress(100));
        // console.log("SENDOTP API RESPONSE............", response)
        
        // console.log(response.data.success)
        
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        // console.log("SENDOTP API ERROR............", error)
        toast.error(error?.response?.data?.message)
        // dispatch(setProgress(100));
      }
      dispatch(setLoading(false))
      // toast.dismiss(toastId)
    }
  }

export function signUp(
  email, firstName, lastName, password, confirmPassword, accountType, otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnect("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      // console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // dispatch(setProgress(100));
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      // dispatch(setProgress(100));
      // console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnect("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // dispatch(setProgress(100))
      toast.success("Login Successful")
      console.log(response.data.user);
      dispatch(setToken(response.data.token))
      const userImage = response.data.user.userImage
        ? response.data.user.userImage
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({...response.data.user}))
      dispatch(setUserImage(userImage))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/dashboard/my-profile")
    } catch (error) {
      // dispatch(setProgress(100))
      // console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
  
export function logout(navigate) {
  // console.log('object');
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(setUserImage(null))
    //   dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("userImage")
      toast.success("Logged Out")
      navigate("/")
    }
}

export function forgotPassword(email,setEmailSent) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnect("POST", RESETPASSWORDTOKEN_API, {
        email,
      })

      // console.log("FORGOTPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent");
      setEmailSent(true)
    } catch (error) {
      // console.log("FORGOTPASSWORD ERROR............", error)
    }
    // toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token,setResetComplete){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    // console.log(password, confirmPassword, token);
    try{
      const response = await apiConnect('POST', RESETPASSWORD_API, {password, confirmPassword, token})
      // console.log("FORGOTPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message)
      }

      toast.success("Reset Password successfully");
      setResetComplete(true);
    }catch(error){
      // console.log("RESETPASSWORD ERROR............", error)
    }
    dispatch(setLoading(false))
  }
}
