import axios from 'axios';
import { obterCabecalhoComToken } from './jwt';

function post(urlString, data, configuracoes) {
    const cabecalho = obterCabecalhoComToken();
    const configuracoesMescladas = Object.assign(cabecalho, configuracoes);
    return axios.post(urlString, data, configuracoesMescladas);
}

function get(urlString, configuracoes) {
    const cabecalho = obterCabecalhoComToken();
    const configuracoesMescladas = Object.assign(cabecalho, configuracoes);
    return axios.get(urlString, configuracoesMescladas);
}

function remove(urlString, configuracoes) {
    const cabecalho = obterCabecalhoComToken();
    const configuracoesMescladas = Object.assign(cabecalho, configuracoes);
    return axios.delete(urlString, configuracoesMescladas);
}

function put(urlString, data, configuracoes) {
    const cabecalho = obterCabecalhoComToken();
    const configuracoesMescladas = Object.assign(cabecalho, configuracoes);
    return axios.put(urlString, data, configuracoesMescladas);
}

function patch(urlString, data, configuracoes) {
    const cabecalho = obterCabecalhoComToken();
    const configuracoesMescladas = Object.assign(cabecalho, configuracoes);
    return axios.patch(urlString, data, configuracoesMescladas);
}

export const requisicaoAutorizada = {
    post,
    get,
    delete: remove,
    put,
    patch,
};
