import account from './modules/account';
import mensagem from './modules/mensagem';
import notificacao from './modules/notificacao';
import plataforma from './modules/plataforma';
import sistema from './modules/sistema';
import websocket from './modules/websocket';

import ComunicationServiceChat from './modules/websocket/Chat.vue';
import ComunicationServiceStatus from './modules/websocket/Status.vue';
import ComunicationServiceNotificacaoBadge from './modules/notificacao/NotificacaoBadge.vue';

function install(Vue, { store }) {
    if (!store) console.log('Informe uma store.');

    Vue.component('comunication-service-chat', ComunicationServiceChat);
    Vue.component('comunication-service-status', ComunicationServiceStatus);
    Vue.component('comunication-service-notificacao-badge', ComunicationServiceNotificacaoBadge);

    store.registerModule('account', account);
    store.registerModule('mensagem', mensagem);
    store.registerModule('notificacao', notificacao);
    store.registerModule('plataforma', plataforma);
    store.registerModule('sistema', sistema);
    store.registerModule('websocket', websocket);
}

export default {
    install,
};
