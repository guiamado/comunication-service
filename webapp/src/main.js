import VeeValidate from 'vee-validate';
import '@babel/polyfill';
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters';
import './registerServiceWorker';

const socketServer = `http://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}`;

Vue.use(VeeValidate);

const token = localStorage.getItem('token');
const clientSocketOptions = {
    query: { token: token },
};
// const clientSocketOptions = {};
if (token != null) {
    Vue.use(new VueSocketIO({
        debug: true,
        connection: SocketIO(socketServer, clientSocketOptions),
        vuex: {
            store,
            actionPrefix: 'Socket_',
            mutationPrefix: 'Socket_',
        },
    }));
}

filters.create(Vue);

new Vue({
    router,
    store,
    filters,
    render: h => h(App),
}).$mount('#app');
