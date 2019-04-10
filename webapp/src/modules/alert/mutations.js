import * as types from './types';

export default {
    [types.GETALLREQUEST](state) {
        state.all = { loading: true };
    },
    [types.SUCCESS](state, mensagem) {
        state.tipoMensagem = 'success';
        state.mensagem = mensagem;
    },
    [types.ERROR](state, mensagem) {
        state.tipoMensagem = 'error';
        state.mensagem = mensagem;
    },
    [types.INFO](state, mensagem) {
        state.tipoMensagem = 'info';
        state.mensagem = mensagem;
    },
    [types.CLEAR](state) {
        state.tipoMensagem = null;
        state.mensagem = null;
    },
};
