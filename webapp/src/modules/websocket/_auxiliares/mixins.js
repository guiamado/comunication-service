import { tratarConexaoWebsocket } from './tratar-conexao-websocket';

export default {
    mounted() {
        const token = localStorage.getItem('token');
        tratarConexaoWebsocket({
            store: this.$store,
            token,
        });
    },
};
