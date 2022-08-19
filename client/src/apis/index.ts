import axios from "axios";

export const authAPI = axios.create({
    baseURL: '/api/auth'
})

export const feedsAPI = axios.create({
    baseURL: '/api/feeds'
})

export const storyAPI = axios.create({
    baseURL: '/api/story'
})