import { obterInformacoesJWT } from '../account/_auxiliares/jwt';

let informacoesJWT = '';
try {
    informacoesJWT = obterInformacoesJWT();
} catch (Exception) {
    informacoesJWT = '';
}

const loggedIn = informacoesJWT !== '';

export const state = {
    status: { loggedIn },
    token: informacoesJWT,
    informacoesConta: informacoesJWT ? informacoesJWT.user : '',
};

