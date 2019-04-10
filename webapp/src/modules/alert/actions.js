import * as types from './types';

export const success = ({ dispatch, commit }, message) => {
    commit(types.SUCCESS, message);
    dispatch('alert/limpar', message, { root: true });
};
export const error = ({ dispatch, commit }, message) => {
    commit(types.ERROR, message);
    dispatch('alert/limpar', message, { root: true });
};
export const info = ({ dispatch, commit }, message) => {
    commit(types.INFO, message);
    dispatch('alert/limpar', message, { root: true });
};
export const limpar = ({ commit }, message) => {
    commit(types.LIMPAR, message);
};
