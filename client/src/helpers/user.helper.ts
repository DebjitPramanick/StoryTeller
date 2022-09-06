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
    const res = await userAPI.put('/action/follow', {
        following: target,
        follower: source
    })
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const unfollowUser = async (target: string, source: string) => {
    const res = await userAPI.put('/action/unfollow', {
        following: target,
        follower: source
    })
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}