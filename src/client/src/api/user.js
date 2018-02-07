import api from './axios'



const getAuthenticatedUser = () => {
    return api.get('/me');
}

const updateOwnProfile = (formData) => {
    return api.patch('/me/profile', formData)
}

export default {
    getAuthenticatedUser,
    updateOwnProfile
}