import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'

const ProtectedRoutes: React.FC<any> = ({ children }) => {

    const { isLoggedIn } = useUser();

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoutes