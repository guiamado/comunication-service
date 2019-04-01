import * as types from './types';
import $socket from './_helpers/socket-client-instance';

export const Socket_connect = ({ commit }, data) => {
    commit(types.SOCKET_CONNECT, data);
};

export const Socket_disconect = ({ commit }, data) => {
    commit(types.SOCKET_DISCONNECT, data);
};

export const Socket_clientConnectedUsers = ({ commit }, data) => {
    commit(types.SOCKET_CLIENT_CONNECTEDUSERS, data);
};

export const Socket_serverEntrarEmSala = ({ commit}, data) => {
    console.log(data)
    console.log('1111111')
    const { sala } = data;
    $socket.emit('serverEntrarEmSala', {
        sala,
    });
    commit(types.SOCKET_SERVER_ENTRAREMSALA, data);
};

export const Socket_clientEntrarEmSala = ({ commit, socket }, data) => {
    commit(types.SOCKET_CLIENT_ENTRAREMSALA, data);
};

export const Socket_clientSairDaSala = ({ commit, socket }, data) => {
    commit(types.SOCKET_CLIENT_SAIRDASALA, data);
};

export const Socket_clientMensagemSala = ({ commit, socket }, data) => {
    commit(types.SOCKET_CLIENT_MENSAGEMSALA, data);
};
