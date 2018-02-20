
import * as types from '../mutation-types'

const state = {
    chatOpen: false
}

const getters = {
    isChatOpen: state => state.chatOpen
}

const actions = {
    openChat ({ commit, state }) {
        // if chat not open and able to open open the chat
        commit(types.OPEN_CHAT);
    },
    closeChat ({ commit, state }) {
        // if chat open and able to close close the chat
        commit(types.CLOSE_CHAT);
    },
    selectChat ({ commit, state }, { chatId }) {
        // if chat open and able to close close the chat
        commit(types.SELECT_CHAT, { chatId });
    },
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