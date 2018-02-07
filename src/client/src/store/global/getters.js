const getters = {
    isLoggedIn: state => state.user.authToken && state.user.account,
    hasAuthToken: state => state.user.authToken
}

export default getters;