import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './global/actions'
import getters from './global/getters'

import user from './modules/user'
import users from './modules/users'
import ui from './modules/ui'
import notifications from './modules/notifications'
import chat from './modules/chat'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    getters,
    actions,
    modules: {
        user,
        users,
        ui,
        notifications,
        chat
    },
    strict: debug
})