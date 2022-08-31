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