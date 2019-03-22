import * as types from './types';

export const mutations = {
    [types.SOCKET_CONNECT](state, data) {
        state.websocket.isConnected = true;
    },

    [types.SOCKET_DISCONNECT](state, data) {
        state.websocket.isConnected = false;
    },

    [types.SOCKET_CONNECTEDUSERS](state, data) {
        state.websocket.connectedUsers = data;
    },
};
