import api from './api';

export const register = async(payload) => {
    const response = await api.post('/users/register', payload);
    return response.data
}

export const login = async(payload) => {
    const response = await api.post('/users/login', payload);
    return response.data
}
