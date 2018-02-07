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
    getAuthenticatedUser ({ commit }) {
        UserApi.getAuthenticatedUser()
        .then((result) => {
            commit(types.RECEIVE_AUTHENTICATED_USER, { user: result.data.user })
        })
        // fetch user from api commit RECEIVE_AUTHENTICATED_USER
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
        commit(types.LOGOUT);
    },
    async submitProfileUpdate({ commit }, formData) {
        const updateResult = await UserApi.updateOwnProfile(formData);
        const user = updateResult.data.user;
        commit(types.RECEIVE_AUTHENTICATED_USER, { user });
    }
}

const mutations = {
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
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}