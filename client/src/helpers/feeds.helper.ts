import axios from "axios";
import { feedsAPI } from "../apis";


export const getFeeds = async () => {
    const res = await feedsAPI.post('/')
        .catch(err => {
            throw new Error(err)
        })

    return res;
}