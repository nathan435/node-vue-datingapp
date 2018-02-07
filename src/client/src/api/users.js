import api from './axios'



const getUsersList = () => {
    return api.get('/users');
}

const visitUser = (userId) => {
    return api.get('/users/' + userId);
}

const likeUser = (userId) => {
    return api.post('/users/like', {
        likedID: userId
    });
}

export default {
    getUsersList,
    visitUser,
    likeUser
}