import * as types from './types';
import $socket from './_helpers/socket-client-instance';

export const Socket_connect = ({ commit }, dados) => {
    commit(types.SOCKET_CONNECT, dados);
};

export const Socket_disconect = ({ commit }, dados) => {
    commit(types.SOCKET_DISCONNECT, dados);
};

export const Socket_clientConnectedUsers = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_CONNECTEDUSERS, dados);
};

export const Socket_serverEntrarEmSala = ({ commit }, dados) => {
    const { sala } = dados;
    $socket.emit('serverEntrarEmSala', {
        sala,
    });
    commit(types.SOCKET_SERVER_ENTRAREMSALA, dados);

    const { usuario } = dados;
    const novosDados = dados;
    novosDados.mensagem = `Usuário <b>${usuario.name}</b> entrou na sala.`;
    commit(types.SOCKET_CLIENT_MENSAGEMSALA, dados);
};

export const Socket_clientEntrarEmSala = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_ENTRAREMSALA, dados);
};

export const Socket_clientSairDaSala = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_SAIRDASALA, dados);
};

export const Socket_clientMensagemSala = ({ commit }, dados) => {
    commit(types.SOCKET_CLIENT_MENSAGEMSALA, dados);
};
