import { storyAPI } from "../apis";
import { getError } from "./error.helper";

export const getAuthorStories = async (authorId: string) => {
    const res = await storyAPI.get(`/author/${authorId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const updateStory = async (storyId: string, data: any) => {
    const res = await storyAPI.put(`/update/${storyId}`, data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const deleteStory = async (storyId: string) => {
    const res = await storyAPI.delete(`/delete/${storyId}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}

export const searchStories = async (query: string) => {
    const res = await storyAPI.get(`/collection/${query}`)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}