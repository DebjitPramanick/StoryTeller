import React from 'react'
import { useUser } from '../../contexts/UserContext'

const Logout = () => {

    const {logoutUser} = useUser()

    logoutUser()
    window.location.href = "/login"

    return null
}

export default Logout