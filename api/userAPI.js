import useFetch from '../hooks/useFetch'

export const register = (payload) => {
    console.log(payload);
    return useFetch('/users','post',payload);
}
