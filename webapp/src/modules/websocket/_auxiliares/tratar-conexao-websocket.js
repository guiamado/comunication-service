import { obterInformacoesJWT } from '../../account/_auxiliares/jwt';

export const tratarConexaoWebsocket = (store) => {
    
    const token = localStorage.getItem('token');
    if (store._vm.$socket.disconnected === true && token != null) {
        const informacoesToken = obterInformacoesJWT();
        if (informacoesToken !== '') {
            console.log('somente 1 vez')
            store._vm.$socket.io.opts.query.token = token;
            store._vm.$socket.open();
            console.log(store._vm.$socket);
        }
    }
};
