import { storyAPI } from "../apis";
import { getError } from "./error.helper";

export const createStory = async(data: any, authorId: string) => {
    const res = await storyAPI.post(`/create/${authorId}`, data)
        .catch(err => {
            const error = getError(err);
            throw new Error(error);
        })

    return res;
}