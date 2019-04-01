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

    [types.SOCKET_CLIENT_ENTRAREMSALA](state, data) {
        console.log('entrando na mutation SOCKET_CLIENT_ENTRAREMSALA');
        const { sala } = data;
        const { usuario } = data;
        const horario = moment().format();
        const indice = state.websocket.salas.findIndex(valor => valor.sala === sala);
        if (indice === -1) {
            state.websocket.salas.push({
                sala,
                mensagens: [
                    {
                        mensagem: `Usuário <b>${usuario.name}</b> entrou na sala.`,
                        horario,
                        usuario,
                    },
                ],
            });
        }
        state.salaAtual = sala;
    },

    [types.SOCKET_CLIENT_SAIRDASALA](state, data) {
        console.log('entrando na mutation SOCKET_CLIENT_SAIRDASALA');
        const { sala } = data;
        const indice = state.websocket.salas.findIndex(valor => valor.sala === sala);

        if (indice !== -1) {
            state.websocket.salas.splice(indice, 1);
        }
    },
};
