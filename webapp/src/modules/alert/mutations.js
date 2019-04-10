import * as types from './types';

export default {
    [types.SUCCESS](state, mensagem) {
        state.tipoMensagem = 'success';
        state.mensagem = mensagem;
        state.snackbar = true;
    },
    [types.ERROR](state, mensagem) {
        state.tipoMensagem = 'error';
        state.mensagem = mensagem;
        state.snackbar = true;
    },
    [types.INFO](state, mensagem) {
        state.tipoMensagem = 'info';
        state.mensagem = mensagem;
        state.snackbar = true;
    },
    [types.LIMPAR](state) {
        state.snackbar = false;
    },
};
