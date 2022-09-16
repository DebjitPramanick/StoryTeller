import { userAPI } from "../apis";
import { getError } from "./error.helper";

export const getUser = async (userId: string) => {
    const res = await userAPI.get(`/${userId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const updateUser = async (userId: string, data: any) => {
    const res = await userAPI.put(`/update/${userId}`, data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const followUser = async (target: string, source: string) => {
    const data = {
        following: target,
        follower: source
    }
    console.log(data)
    const res = await userAPI.post('/action/follow', data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const unfollowUser = async (target: string, source: string) => {
    const data = {
        following: target,
        follower: source
    }
    console.log(data)
    const res = await userAPI.post('/action/unfollow', data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const deleteAcccount = async(userId: string) => {
    const res = await userAPI.delete(`/delete/${userId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const getUsersByNameQuery = async (query: string) => {
    const res = await userAPI.get(`/collection/${query}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}