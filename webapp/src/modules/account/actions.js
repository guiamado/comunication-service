import axios from 'axios';
import router from '../../router';
import * as types from './types';
import { obterInformacoesJWT } from './_helpers/jwt';
import { requisicaoAutorizada } from './_helpers/requisicao-autorizada';

export const login = ({ dispatch, commit }, { email, password }) => {
    commit(types.LOGINREQUEST, { email });

    return requisicaoAutorizada.post(
        `http://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}/v1/autenticacao/login`,
        { email, password },
    ).then((response) => {
        try {
            if (response.data && response.data.data) {
                const { data } = response.data;
                if (data && data.token) {
                    commit(types.LOGINSUCCESS, data.token);
                    dispatch('alert/info', 'Login realizado com sucesso!', {
                        root: true,
                    });

                    const objetoJWT = obterInformacoesJWT();
                    commit(types.SETACCOUNTINFO, objetoJWT.user);
                } else {
                    dispatch('alert/error', 'Falha ao realizar login.', {
                        root: true,
                    });
                }
            }
        } catch (Exception) {
            dispatch('alert/error', `Erro: ${Exception}`, {
                root: true,
            });
        }
    }).catch((error) => {
        if (error.response && error.response.data) {
            commit(types.LOGINFAILURE, error.response.data.error);
            dispatch('alert/error', `Erro: ${error.response.data.error}`, {
                root: true,
            });
        }
    });
};

export const logout = ({ commit }) => {
    localStorage.removeItem('token');
    commit(types.LOGOUT);
};

export const register = ({ dispatch, commit }, user) => {
    commit(types.REGISTERREQUEST);
    axios.post(`http://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}/v1/conta`, JSON.parse(JSON.stringify(user))).then(
        () => {
            commit(types.REGISTERSUCCESS);
            dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
            router.push('/login');
        },
        (error) => {
            if (error.response && error.response.data) {
                commit(types.REGISTERFAILURE);
                dispatch('alert/error', error.response.data.error, {
                    root: true,
                });
            }
        },
    );
};
