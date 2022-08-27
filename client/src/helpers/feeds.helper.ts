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