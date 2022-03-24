import axios from 'axios'

export const API_URL = `http://localhost:5000`

const $api = axios.create({
    baseURL: API_URL,
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers.AuthorizationRefresh = `Bearer ${localStorage.getItem('tokenRefresh')}`
    return config;
})
export default $api;
