import Vue from 'vue';
import Vuex from 'vuex';

import comunicationAccount from './modules/account';
import comunicationMensagem from './modules/mensagem';
import comunicationNotificacao from './modules/notificacao';
import comunicationPlataforma from './modules/plataforma';
import comunicationSistema from './modules/sistema';
import comunicationWebsocket from './modules/websocket';
import comunicationAlert from './modules/alert';
import comunicationConta from './modules/conta';


Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        comunicationAccount,
        comunicationAlert,
        comunicationPlataforma,
        comunicationSistema,
        comunicationConta,
        comunicationMensagem,
        comunicationNotificacao,
        comunicationWebsocket,
    },
    strict: true,
});
