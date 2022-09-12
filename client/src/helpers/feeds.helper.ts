import { feedsAPI } from "../apis";
import { getError } from "./error.helper";

export const getFeeds = async () => {
    const res = await feedsAPI.get('/')
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const getFeedById = async (feedId: string) => {
    const res = await feedsAPI.get(`/${feedId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const getSavedFeeds = async (feedId: string) => {
    const res = await feedsAPI.get(`/saved/${feedId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const likeFeed = async (userId: string, feedId: string) => {
    const res = await feedsAPI.post(`/action/like`, {
        userId: userId,
        feedId: feedId
    })
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const dislikeFeed = async (userId: string, feedId: string) => {
    const res = await feedsAPI.post(`/action/dislike`, {
        userId: userId,
        feedId: feedId
    })
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const saveFeed = async (userId: string, feedId: string) => {
    const res = await feedsAPI.post(`/action/save`, {
        userId: userId,
        feedId: feedId
    })
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const removeFeed = async (userId: string, feedId: string) => {
    const res = await feedsAPI.post(`/action/remove`, {
        userId: userId,
        feedId: feedId
    })
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}