import * as types from '../mutation-types'

export const logOut = ({ commit }, user) => {
    commit(types.LOGOUT);
}