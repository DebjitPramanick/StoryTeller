import axios from "axios";
import { authAPI } from "../apis";


export const loginUser = async (data: any) => {
    const res = await authAPI.post('/login', data)
        .catch(err => {
            throw new Error(err)
        })

    return res;
}

export const registerUser = async (data: any) => {
    const res = await authAPI.post('/register', data)
        .catch(err => {
            throw new Error(err)
        })

    return res;
}