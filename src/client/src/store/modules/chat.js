import * as types from '../mutation-types'

const state = {
    chats: {},
    selectedChat: null
}

const getters = {
    chats: state => state.chats,
    selectedChat: state => state.selectedChat
}

const actions = {
    submitMessage ({ commit, state }, { message }) {
        console.log('chatIdBeforeEmit', state.selectedChat);
        this._vm.$socket.emit('message', { message, chatId: state.selectedChat });
        commit(types.NEW_MESSAGE, { message })
        // emit new message to server
    },
    startChat ({ commit, state}, { userId }) {
        // if there already is a chat with this user dont open another,
        // just set the selected chat to that chat

        if (!state.chats[userId]) {
            commit (types.NEW_CHAT, { userId })
        }
        commit (types.OPEN_CHAT);
        commit (types.SELECT_CHAT, { chatId: userId });
    }
}

const mutations = {
    SOCKET_INIT_CHATS (state, chats) {
        state.notificationList = notificationList;
    },
    SOCKET_NEW_MESSAGE: (state, data) => {
        state.chats = {...state.chats};
        const { chatId, message } = data[0];

        if (!state.chats[chatId]) {
            state.chats[chatId] = {
                partner: chatId,
                messages: []
            }
        }
        // update chat of given message with the new message
        state.chats[chatId].messages.push(message);
        
    },
    [types.NEW_MESSAGE] (state, data) {
        const { message } = data;
        state.chats[state.selectedChat].messages.push(message);
    },
    [types.NEW_CHAT] (state, { userId }) {
        state.chats = {
            ...state.chats,
        }

        state.chats[userId] = {
            partner: userId,
            messages: []
        }
    },
    [types.SELECT_CHAT] (state, { chatId }) {
        state.selectedChat = chatId;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}