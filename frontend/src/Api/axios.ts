import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.BASE_URL_API,
    withCredentials: true,
})

export default instance;