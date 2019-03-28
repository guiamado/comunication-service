import * as types from './types';

export const mutations = {
    [types.SOCKET_CONNECT](state, data) {
        state.websocket.isConnected = true;
    },

    [types.SOCKET_DISCONNECT](state, data) {
        state.websocket.isConnected = false;
    },

    [types.SOCKET_CLIENT_CONNECTEDUSERS](state, data) {
        state.websocket.connectedUsers = data;
    },

    [types.SOCKET_CLIENT_ENTRARCANAL](state, data) {
        // const { canal } = data;
        // const sistema_id = canal.sistema_id;
        state.websocket.canal = data;
    },
};
