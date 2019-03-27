import * as types from './types';

export const SOCKET_connect = ({ commit }, data) => {
    commit(types.SOCKET_CONNECT, data);
};

export const SOCKET_disconect = ({ commit }, data) => {
    commit(types.SOCKET_DISCONNECT, data);
};

export const SOCKET_clientConnectedUsers = ({ commit }, data) => {
    commit(types.SOCKET_CONNECTEDUSERS, data);
};

