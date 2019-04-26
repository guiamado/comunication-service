import Account from './modules/account';
import Mensagem from './modules/mensagem';
import Notificacao from './modules/notificacao';
import Plataforma from './modules/plataforma';
import Sistema from './modules/sistema';
import Websocket from './modules/websocket';

function install(Vue, options = {}) {
    if (!options.store) console.log('Informe uma store.');

    options.store.registerModule('Account', Account);
    options.store.registerModule('Mensagem', Mensagem);
    options.store.registerModule('Notificacao', Notificacao);
    options.store.registerModule('Plataforma', Plataforma);
    options.store.registerModule('Sistema', Sistema);
    options.store.registerModule('Websocket', Websocket);
}

export default {
    install,
};
