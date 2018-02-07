
import * as types from '../mutation-types'

const state = {
    chatOpen: false
}

const getters = {
    isChatOpen: state => state.chatOpen
}

const actions = {
    openChat ({ commit, state }, user) {
        // if chat not open and able to open open the chat
        let userId;
        if (user) userId = user.id;
        commit(types.OPEN_CHAT, userId);
    },
    closeChat ({ commit, state }) {
        // if chat open and able to close close the chat
        commit(types.CLOSE_CHAT);
    }
}

const mutations = {
    [types.OPEN_CHAT] (state, userId) {
        state.chatOpen = true;
    },
    [types.CLOSE_CHAT] (state) {
        state.chatOpen = false;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}