import { apiConnect } from "../apiConnector";
import { settingEndpoint } from "../api";
import toast from "react-hot-toast";
import { setUser, setUserImage } from "../../slices/profileSlice";
import { logout } from "./authApi";

const {CHANGEPASSWORD_API, DELETE_USERACCOUNT_API, UPDATE_USER_PROFILE_DETAILS_API, UPDATE_USER_PROFILE_PICTURE_API, GET_ENROLLED_COURSES_API} = settingEndpoint

export async function updateProfilePicture(image, token, dispatch){
    const toastId = toast.loading('Uploading...')
    try{
        const formData = new FormData();
        formData.append('imageFile', image)
        const response = await apiConnect('PUT', UPDATE_USER_PROFILE_PICTURE_API, formData, {
            Authorization: `Bearer ${token}`,
          });
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('Profile Picture Updated Successfully')
        dispatch(setUserImage(response.data.data.userImage))
        localStorage.setItem('userImage', JSON.stringify(response.data.data.userImage))
    }catch(error){
        // console.log(error);
        // console.log('Error while uploading profile picture');
    }
    toast.dismiss(toastId);
}

export async function updateProfileDetails(userData, token, dispatch){
    const {firstName,lastName,dateOfBirth,gender,contactNumber,about}=userData;
    const toastId = toast.loading("Updating...");
    try {
      const response = await apiConnect("PUT", UPDATE_USER_PROFILE_DETAILS_API,{firstName,lastName,dateOfBirth,gender,contactNumber,about},{
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_ADDITIONAL_DETAILS_API API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Additional Details Updated Successfully");
      const user = JSON.parse(localStorage.getItem("user"));
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.additionalDetails.dateOfBirth = dateOfBirth  || user.additionalDetails.dateOfBirth;
      user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
      user.additionalDetails.about = about || user.additionalDetails.about;
      user.additionalDetails.gender=gender
      dispatch(setUser(user))
      localStorage.setItem("user",JSON.stringify(user));
  
    } catch (error) {
    //   console.log("UPDATE_ADDITIONAL_DETAILS_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
  }

export async function changePassword(passwordData, token){
    const {oldPassword, newPassword}=passwordData;
    const toastId = toast.loading("Updating...");
    try{
        const response = await apiConnect('PUT', CHANGEPASSWORD_API, {oldPassword, newPassword}, {
            Authorization: `Bearer ${token}`
        });
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success('Password Updated Successfully');
    }catch(error){
        // console.log("UPDATE_ADDITIONAL_DETAILS_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export async function deleteAccount(token, navigate, dispatch){
    const toastId = toast.loading('Loading...')
    try{
        const response = await apiConnect('DELETE', DELETE_USERACCOUNT_API, {}, {
            Authorization: `Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success('Profile has been deleted successfully')
        dispatch(logout(navigate));
        // console.log(response);
    }catch(error){
        // console.log("DELETE_USERACCOUNT_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export async function getEnrolledCourses(token){
    let result;
    try{
        const response = await apiConnect('GET', GET_ENROLLED_COURSES_API, {}, {
            Authorization: `Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.response
    }catch(error){
        // console.log("GET_ENROLLED_COURSES_API API ERROR............", error)
        toast.error(error)
    }
    return result
}

