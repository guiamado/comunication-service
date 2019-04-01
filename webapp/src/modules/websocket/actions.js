import * as types from './types';

export const Socket_connect = ({ commit }, data) => {
    commit(types.SOCKET_CONNECT, data);
};

export const Socket_disconect = ({ commit }, data) => {
    commit(types.SOCKET_DISCONNECT, data);
};

export const Socket_clientConnectedUsers = ({ commit }, data) => {
    commit(types.SOCKET_CLIENT_CONNECTEDUSERS, data);
};

export const Socket_clientEntrarEmSala = ({ commit, socket }, data) => {
    commit(types.SOCKET_CLIENT_ENTRAREMSALA, data);
};

export const Socket_clientSairDaSala = ({ commit, socket }, data) => {
    commit(types.SOCKET_CLIENT_SAIRDASALA, data);
};


