import api from './axios'



const getAuthenticatedUser = () => {
    return api.get('/me');
}

const updateOwnProfile = (formData) => {
    return api.patch('/me/profile', formData)
}

const updateProfilePicture = (image) => {
    const formData = new FormData();
    formData.append('image', image);
    return api.post('/users/upload/profile', formData);
}

export default {
    getAuthenticatedUser,
    updateOwnProfile,
    updateProfilePicture
}