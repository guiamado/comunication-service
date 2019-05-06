import { tratarConexaoWebsocket } from './tratar-conexao-websocket';

export default {
    mounted() {
        const token = localStorage.getItem('communication_token');
        tratarConexaoWebsocket({
            store: this.$store,
            token,
        });
    },
};
