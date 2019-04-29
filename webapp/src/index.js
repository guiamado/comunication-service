import Account from './modules/account';
import Mensagem from './modules/mensagem';
import Notificacao from './modules/notificacao';
import Plataforma from './modules/plataforma';
import Sistema from './modules/sistema';
import Websocket from './modules/websocket';

function install(Vue, { store }) {
    if (!store) console.log('Informe uma store.');

    store.registerModule('Account', Account);
    store.registerModule('Mensagem', Mensagem);
    store.registerModule('Notificacao', Notificacao);
    store.registerModule('Plataforma', Plataforma);
    store.registerModule('Sistema', Sistema);
    store.registerModule('Websocket', Websocket);
}

export default {
    install,
};
