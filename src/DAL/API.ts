import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'c2e39203-417e-4936-90ba-36cd8b9b6c99'
    }
});
