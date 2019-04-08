import VeeValidate from 'vee-validate';
import '@babel/polyfill';
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters';
import './registerServiceWorker';
import $socket from './modules/websocket/_helpers/socket-client-instance';

Vue.use(VeeValidate);

filters.create(Vue);

new Vue({
    router,
    store,
    filters,
    render: h => h(App),
}).$mount('#app');
