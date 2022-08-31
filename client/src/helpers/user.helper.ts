import { userAPI } from "../apis";
import { UserDetailsType } from "../utils/types";
import { getError } from "./error.helper";

export const getUser = async (userId: string) => {
    const res = await userAPI.get(`/${userId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const updateUser = async (userId: string, data: UserDetailsType) => {
    const res = await userAPI.put(`/update/${userId}`, data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}