import api from './api';

export const register = async(payload) => {
    try {        
        const response = await api.post('/users/register', payload);
        return response.data
    } catch (error) {
        return error
    }
}

export const login = async(payload) => {
    try {
        const response = await api.post('/users/login', payload);
        return response.data
    } catch (error) {
        return error
    }
}
