import axios from 'axios'


import NProgress from 'nprogress';
NProgress.configure({
    easing: 'linear',
    speed: 350
});
import 'nprogress/nprogress.css'

window.NProgress = NProgress;

import store from '../store'

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use((config) => {
    const token = store.state.user.authToken;
    config.headers.auth = token;
    return config;
});


api.defaults.transformRequest.push(function (data, headers) {
    NProgress.start();
    return data;
})

api.defaults.transformResponse.push(function (data, headers) {
    NProgress.done();
    return data;
})


export default api;