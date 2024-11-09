import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const signup = async (data) => {
    return await axios.post(`${API_URL}/signup`, data);
};

export const login = async (data) => {
    return await axios.post(`${API_URL}/login`, data);
};

export const getPosts = async () => {
    return await axios.get(`${API_URL}/api/posts`);
};

export const createPost = async (postData) => {
    return await axios.post(`${API_URL}/api/posts`, postData);
};
