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

const signup = () => {

}


export default {
    tryLogin,
    signup
}