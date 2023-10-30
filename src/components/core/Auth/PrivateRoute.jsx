import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../../services/operations/authApi';

function PrivateRoute({children}) {
    
    const {token, loading} = useSelector((state)=>state.auth);
    // const dispatch = useDispatch()
    // const [loggedIn, setloggedIn] = useState(false);
    // useEffect(async() => {
    //     const result = await verifyToken(token, dispatch);
    //     setloggedIn(result)
    // }, [])

    // if(!loading){
    // }
    if(token!==null){
        return children;
    }
    return <Navigate to={'/login'}/>
}

export default PrivateRoute