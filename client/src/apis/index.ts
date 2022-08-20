import axios from "axios";

const BASE_URL = 'http://127.0.0.1:4000'

export const authAPI = axios.create({
    baseURL: `${BASE_URL}/api/auth`
})

export const feedsAPI = axios.create({
    baseURL: `${BASE_URL}/api/auth`
})

export const storyAPI = axios.create({
    baseURL: `${BASE_URL}/api/auth`
})