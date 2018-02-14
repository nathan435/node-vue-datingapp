import api from './axios'



const tryLogin = (credentials) => {
    const {
        email,
        password
    } = credentials;

    return api.post('/login', {
        email,
        password
    })
}

const signup = (formData) => {
    return api.post('/signup', formData);
}


export default {
    tryLogin,
    signup
}