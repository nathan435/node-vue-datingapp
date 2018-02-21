import * as types from '../mutation-types'

const state = {
    chats: {},
    selectedChat: null
}

const getters = {
    chats: state => state.chats,
    orderedChats: (state) => {
        // sort chats by most recent message
        const chatsList = [];
        for (let chatId in state.chats) {
            if (state.chats.hasOwnProperty(chatId)) {
                chatsList.push({...state.chats[chatId]});
            }
        }

        chatsList.sort((a, b) => {
            if (a.new) return 1;
            if (b.new) return -1;
            if (!b || !b.messages || !b.messages[b.messages.length -1]) return -1;
            if (a.messages[a.messages.length - 1].timestamp < b.messages[b.messages.length - 1].timestamp) return 1;
            if (a.messages[a.messages.length - 1].timestamp > b.messages[b.messages.length - 1].timestamp) return -1;
            return 0;
        });

        console.log('orderedChats recalculating...')

        return chatsList;
    },
    selectedChat: state => state.selectedChat,
    unreadMessagesCount: (state) => {
        // loop through all chat objects
        let count = 0;
        for (let chatId in state.chats) {
            if (state.chats.hasOwnProperty(chatId)) {
                count += state.chats[chatId].messages.length;
            }
        }
        // count the number of unread messages

        return count;
    },
    mostRecentUnreadChat: (state) => {
        // find most recent unread chat

    }
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

        // emit io event to send that all msgs from this chat were read
        this._vm.$socket.emit('chat_read', { chatId: state.selectedChat });
    }
}

const mutations = {
    SOCKET_INIT_CHATS (state, data) {
        state.chats = {};
        data[0].forEach((chat) => {
            state.chats[chat.partner] = {
                messages: chat.messages,
                partner: chat.partner
            }
        })
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
        state.chats = {...state.chats};

        state.chats[state.selectedChat].messages.push(message);
    },
    [types.NEW_CHAT] (state, { userId }) {
        state.chats = {
            ...state.chats,
        }

        state.chats[userId] = {
            partner: userId,
            messages: [],
            new: true
        }
    },
    [types.SELECT_CHAT] (state, { chatId }) {
        // remove new attribute from all other chats
        for (let id in state.chats) {
            if (state.chats.hasOwnProperty(id) && id !== chatId) {
                state.chats[chatId].new = false;
            }
        }
        state.selectedChat = chatId;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}