import Cookies from 'cookies-js'

// import api module for user
import * as types from '../mutation-types'
import UserApi from '../../api/user'
import AuthApi from '../../api/auth'

const searchForAuthToken = () => {
    const authToken = Cookies.get('authToken');
    if (authToken) return authToken;
    return null;
}

const state = {
    account: null,
    authToken: searchForAuthToken()
}

const getters = {
    user: state => state.account
}

const actions = {
    async getAuthenticatedUser ({ commit }) {
        try {
            const result = await UserApi.getAuthenticatedUser();
            if (!result.data.user) throw new Error();
            commit(types.RECEIVE_AUTHENTICATED_USER, { user: result.data.user });
        } catch (e) {
            commit(types.LOGOUT);
        }
    },
    tryLogin ({ commit, state }, credentials) {
        AuthApi.tryLogin(credentials)
        .then((result) => {
            if (result.data && result.data.token) {
                commit(types.RECEIVE_LOGIN_SUCCESS, { token: result.data.token, user: result.data.user })
            }
            
        })
    },
    logOut ({ commit, state }) {
        // inform api about logout
        this._vm.$socket.emit('logout');
        commit(types.LOGOUT);
    },
    async uploadProfilePicture ({ commit, state }, imageFile) {
        try {
            // encode the file
            const result = await UserApi.updateProfilePicture(imageFile);
            if (!result.data.user || !result.user.profileImage) throw new Error();

            commit(types.UPLOAD_PROFILE_PICTURE_SUCCESS, { user });
        } catch (e) {
            console.log(e);
        }

    },
    async submitProfileUpdate({ commit }, formData) {
        const updateResult = await UserApi.updateOwnProfile(formData);
        const user = updateResult.data.user;
        commit(types.RECEIVE_AUTHENTICATED_USER, { user });
    },
}

const mutations = {
    SOCKET_CONNECT (state, data) {
        console.log('connected', data);
    },
    SOCKET_NEW_MESSAGE (state, data) {
        console.log('test')
    },
    SOCKET_NEW_NOTIFICATION (state, data) {
        console.log('test')
    },
    [types.RECEIVE_AUTHENTICATED_USER] (state, { user }) {
        state.account = user;
    },
    [types.RECEIVE_LOGIN_SUCCESS] (state, { token, user }) {
        state.authToken = token;
        state.account = user;
        Cookies.set('authToken', token);
    },
    [types.LOGOUT] (state) {
        state.authToken = null;
        state.account = null;
        Cookies.expire('authToken');
        // clear cookies/localstorage
    },
    [types.UPLOAD_PROFILE_PICTURE_SUCCESS] (state, { user }) {
        console.log('success');
        state.account = user;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}