import moment from 'moment';
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
        console.log('entrando na mutation SOCKET_CLIENT_ENTRARCANAL')
        const canal = data.sistema_id;
        const { usuario } = data;
        const horarioAtual = moment().format();

        if (state.websocket.canais[canal] == null) {
            state.websocket.canais[canal] = [];
        }
        state.websocket.canais[canal].push({
            mensagem: `Usuário <b>${usuario.name} entrou no canal.</b>`,
            horario: horarioAtual,
            usuario: usuario,
        });
    },
};
