// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
import './styles/bootstrap-4.0.0/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/globals.scss'


import store from './store'
import { log } from 'util';

window.store = store;

Vue.config.productionTip = false

// init user
if (store.state.user.authToken) {
  store.dispatch('getAuthenticatedUser');
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


