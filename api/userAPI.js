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

export const addAddress = async(payload) => {
    try {
        const response = await api.post('/users/addAddress', payload);
        return response.data
    } catch (error) {
        return error
    }
}

export const getAddresses = async(userId) => {
    try {
        const response = await api.get(`/users/getAllAddresses/${userId}`);
        return response.data
    } catch (error) {
        return error
    }
}

export const placeOrder = async(payload) => {
    try {
        const response = await api.post(`/users/addOrder`, payload);
        return response.data
    } catch (error) {
        return error
    }
}
