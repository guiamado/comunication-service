import * as types from './types';

export default {
    [types.LOGIN_REQUISICAO](state, token) {
        state.status = { loggingIn: true };
        state.token = token;
    },
    [types.LOGIN_SUCESSO](state, token) {
        localStorage.setItem('token', token);
        state.status = { loggedIn: true };
        state.token = token;
    },
    [types.DEFINIR_INFORMACOES_CONTA](state, accountInfo) {
        state.accountInfo = accountInfo;
    },
    [types.LOGIN_FALHA](state) {
        state.status = {};
        state.token = null;
    },
    [types.LOGOUT](state) {
        state.status = {};
        state.token = null;
        state.accountInfo = null;
    },
    [types.REGISTRAR_REQUISICAO](state) {
        state.status = { registrando: true };
    },
    [types.REGISTRAR_SUCESSO](state) {
        state.status = {};
    },
    [types.REGISTRAR_FALHA](state) {
        state.status = {};
    },
};
