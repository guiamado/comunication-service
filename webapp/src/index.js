import VueSocketIO from 'vue-socket.io';
import comunicationAccount from './modules/account';
import comunicationMensagem from './modules/mensagem';
import comunicationNotificacao from './modules/notificacao';
import comunicationPlataforma from './modules/plataforma';
import comunicationSistema from './modules/sistema';
import comunicationWebsocket from './modules/websocket';

import ComunicationServiceChat from './modules/websocket/Chat.vue';
import ComunicationServiceStatus from './modules/websocket/Status.vue';
import ComunicationServiceNotificacaoBadge from './modules/notificacao/NotificacaoBadge.vue';
import filters from './filters';
import $socket from './modules/websocket/_auxiliares/socket-client-instance';

function install(Vue, { store }) {
    if (install.installed) return;
    install.installed = true;

    if (!store) console.log('Informe uma store.');

    Vue.component('comunication-service-chat', ComunicationServiceChat);
    Vue.component('comunication-service-status', ComunicationServiceStatus);
    Vue.component('comunication-service-notificacao-badge', ComunicationServiceNotificacaoBadge);

    store.registerModule('comunicationAccount', comunicationAccount);
    store.registerModule('comunicationMensagem', comunicationMensagem);
    store.registerModule('comunicationNotificacao', comunicationNotificacao);
    store.registerModule('comunicationPlataforma', comunicationPlataforma);
    store.registerModule('comunicationSistema', comunicationSistema);
    store.registerModule('comunicationWebsocket', comunicationWebsocket);

    filters.create(Vue);

    Vue.use(new VueSocketIO({
        debug: false,
        connection: $socket,
        vuex: {
            store,
            actionPrefix: 'Socket_',
            mutationPrefix: 'Socket_',
        },
    }));
}

// Cria a definição do módulo para Vue.use()
const plugin = {
    install,
};

// Auto-instala quando o Vue é encontrado (no navegador via <script>)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// Para permitir o uso como um módulo exportável (npm/webpack/etc.)
export default {
    install,
    ComunicationServiceChat,
    ComunicationServiceStatus,
    ComunicationServiceNotificacaoBadge,
};
