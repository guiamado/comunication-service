import Vue from 'vue';
import Vuex from 'vuex';

import account from '@/modules/account';
import alert from '@/modules/alert';
import conta from '@/modules/conta';
import plataforma from '@/modules/plataforma';
import sistema from '@/modules/sistema';
import mensagem from '@/modules/mensagem';
import notificacao from '@/modules/notificacao';
import websocket from '@/modules/websocket';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        account,
        alert,
        plataforma,
        sistema,
        conta,
        mensagem,
        notificacao,
        websocket,
    },
    strict: true,
});
