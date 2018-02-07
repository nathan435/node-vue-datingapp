
import * as types from '../mutation-types'
import UsersApi from '../../api/users'
import AuthApi from '../../api/auth'

import router from '../../router'

const state = {
    usersList: [],
    usersDetails: {}
}

const getters = {
    usersList: (state, getters, rootState) => {
        console.log(state);
        if (!rootState.user.account) return [];
        return state.usersList.filter(user => user.id !== rootState.user.account.id)
    }
}

const actions = {
    async getUsersList ({ commit }) {
        const usersListResult = await UsersApi.getUsersList();
        const { users } = usersListResult.data;
        commit(types.RECEIVE_USERLIST, { users })
    },
    async visitUser ({ commit }, userId) {
        const visitResult = await UsersApi.visitUser(userId);
        commit(types.RECEIVE_USERDETAILS, { user: visitResult.data.user })
        router.push({ name: 'VisitUser', params: { userId: userId } });
    },
    async likeUser ({ commit }, user) {
        console.log('user', user)
        const userId = user.id;
        const likeResult = await UsersApi.likeUser(userId);
        commit(types.RECEIVE_AUTHENTICATED_USER, { user: likeResult.data.user });
        console.log(likeResult);
    }
}

const mutations = {
    [types.RECEIVE_USERLIST] (state, { users }) {
        state.usersList = users;
    },
    [types.RECEIVE_USERDETAILS] (state, { user }) {
        state.usersDetails[user.id] = user;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}