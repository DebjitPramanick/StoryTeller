import axios from "axios";
import { authAPI } from "../apis";
import { getError } from "./error.helper";


export const loginUser = async (data: any) => {
    const res = await authAPI.post('/login', data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const registerUser = async (data: any) => {
    const res = await authAPI.post('/register', data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}