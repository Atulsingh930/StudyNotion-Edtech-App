import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function OpenRoute({children}) {
    const {token} = useSelector((state)=>state.auth);

    if(token===null){
        return children;
    }
    return <Navigate to={'/dashboard/my-profile'}/>
}

export default OpenRoute