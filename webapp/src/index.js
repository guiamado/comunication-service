import account from './modules/account';
import mensagem from './modules/mensagem';
import notificacao from './modules/notificacao';
import plataforma from './modules/plataforma';
import sistema from './modules/sistema';
import websocket from './modules/websocket';

function install(Vue, { store }) {
    if (!store) console.log('Informe uma store.');


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
