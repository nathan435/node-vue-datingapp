import * as types from '../mutation-types'

const state = {
    notificationList: []
}

const getters = {
    notificationList: state => state.notificationList
}

const actions = {
    dismissNotification ({ commit, state }, user) {
        // if chat not open and able to open open the chat
        let userId;
        if (user) userId = user.id;
        commit(types.OPEN_CHAT, userId);
    },
    openNotification ({ commit, state }) {
        // if chat open and able to close close the chat
        commit(types.CLOSE_CHAT);
    }
}

const mutations = {
    SOCKET_INIT_NOTIFICATIONS (state, notificationList) {
        state.notificationList = notificationList;
    },
    SOCKET_NEW_NOTIFICATION (staten, notification) {
        state.notificationList.push(notification);
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}