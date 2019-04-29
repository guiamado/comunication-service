import axios from 'axios';
import router from '../../router';
import * as types from './types';
import { obterInformacoesJWT } from './_auxiliares/jwt';
import { requisicaoAutorizada } from './_auxiliares/requisicao-autorizada';

export const storeInit = () => {};

export const login = ({ dispatch, commit }, { email, password }) => {
    commit(types.LOGIN_REQUISICAO, { email });
    return requisicaoAutorizada.post(
        `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/autenticacao/login`,
        { email, password },
    ).then((response) => {
        try {
            if (response.data && response.data.data) {
                const { data } = response.data;
                if (data && data.token) {
                    commit(types.LOGIN_SUCESSO, data.token);
                    dispatch('alert/info', 'Login realizado com sucesso!', {
                        root: true,
                    });

                    const objetoJWT = obterInformacoesJWT();
                    commit(types.DEFINIR_INFORMACOES_CONTA, objetoJWT.user);

                    router.push('/');
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
            commit(types.LOGIN_FALHA, error.response.data.error);
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

export const registrar = ({ dispatch, commit }, user) => {
    commit(types.REGISTRAR_REQUISICAO);
    axios.post(`http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/v1/conta`, JSON.parse(JSON.stringify(user))).then(
        () => {
            commit(types.REGISTRAR_SUCESSO);
            dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
            router.push('/login');
        },
        (error) => {
            if (error.response && error.response.data) {
                commit(types.REGISTRAR_FALHA);
                dispatch('alert/error', error.response.data.error, {
                    root: true,
                });
            }
        },
    );
};
