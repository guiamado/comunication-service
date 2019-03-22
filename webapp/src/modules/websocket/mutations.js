import * as types from './types';

export const mutations = {
    [types.SOCKET_CONNECT](state, data) {
        console.log('SOCKET_CONNECT');
        state.websocket.isConnected = true;
    },

    [types.SOCKET_DISCONNECT](state, data) {
        console.log('SOCKET_DISCONNECT');
        state.websocket.isConnected = false;
    },

    [types.SOCKET_CONNECTEDUSERS](state, data) {
        console.log('SOCKET_CONNECTEDUSERS');
        state.websocket.connectedUsers = data;
    },
};
