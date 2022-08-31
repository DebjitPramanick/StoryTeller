import axios from "axios";

const BASE_URL = 'http://127.0.0.1:4000'
const USER_TOKEN = localStorage.getItem('story-teller-user-token')

export const authAPI = axios.create({
    baseURL: `${BASE_URL}/api/auth`,
    headers: {
        Authorization: `Bearer ${USER_TOKEN}`
    }
})

export const feedsAPI = axios.create({
    baseURL: `${BASE_URL}/api/feeds`,
    headers: {
        Authorization: `Bearer ${USER_TOKEN}`
    }
})

export const storyAPI = axios.create({
    baseURL: `${BASE_URL}/api/story`,
    headers: {
        Authorization: `Bearer ${USER_TOKEN}`
    }
})