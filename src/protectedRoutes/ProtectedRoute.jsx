import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserState } from '../Context/Usercontext';
import Loader from '../Utilis/Loader';

const ProtectedRoute = ({ children, allowedRoles }) => {

    const [isInitialized, setIsInitialized] = useState(false);
    const { user ,loading} = UserState();

    useEffect(() => {
        if (!loading) {
            setIsInitialized(true);
        }
    }, [loading]);

    if (!isInitialized) {
        return <Loader />
    }

    if (!user || !allowedRoles.includes(user?.role)) {
        return <Navigate to="/login" replace />;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;