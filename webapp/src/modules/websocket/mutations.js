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

    [types.SOCKET_SERVER_ENTRAREMSALA](state, data) {
        console.log('entrando na mutation SOCKET_SERVER_ENTRAREMSALA');
        console.log(data);
    },

    [types.SOCKET_CLIENT_ENTRAREMSALA](state, data) {
        console.log('entrando na mutation SOCKET_CLIENT_ENTRAREMSALA');
        const { sala } = data;
        const indice = state.websocket.salas.findIndex(valor => valor.sala === sala);
        if (indice === -1) {
            state.websocket.indiceSalaAtual = state.websocket.salas.push({
                sala,
                mensagens: [],
            }) - 1;
        }
    },

    [types.SOCKET_CLIENT_SAIRDASALA](state, data) {
        console.log('entrando na mutation SOCKET_CLIENT_SAIRDASALA');
        const { sala } = data;
        const indice = state.websocket.salas.findIndex(valor => valor.sala === sala);

        if (indice !== -1) {
            state.websocket.salas.splice(indice, 1);
        }
    },

    [types.SOCKET_CLIENT_MENSAGEMSALA](state, data) {
        console.log('entrando na mutation SOCKET_CLIENTMENSAGEMSALA');
        const { sala } = data;
        const { mensagem } = data;
        const horario = moment().format();
        const indiceSala = state.websocket.salas.findIndex(valor => valor.sala === sala);
        if (indiceSala !== -1) {
            state.websocket.salas[indiceSala].mensagens.push({
                mensagem,
                horario,
                usuario: {
                    email: data.usuario.email,
                    name: data.usuario.name,
                },
            });
            state.websocket.indiceSalaAtual = indiceSala;
        }
    },
};
