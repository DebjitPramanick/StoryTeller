import axios from "axios";

const BASE_URL = 'https://storyteller-be.onrender.com'
const USER_TOKEN = localStorage.getItem('story-teller-user-token')

export const authAPI = axios.create({
    baseURL: `${BASE_URL}/api/auth`,
    headers: {
        Authorization: `Bearer ${USER_TOKEN}`
    }
})

export const userAPI = axios.create({
    baseURL: `${BASE_URL}/api/user`,
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