import React, { useContext } from 'react';
import { AuthContext } from '../components/providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const location = useLocation();

    const {user, loading} = useContext(AuthContext);
    if(!user){
        return <Navigate to={"/login"} state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivetRoute;