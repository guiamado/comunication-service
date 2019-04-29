import { tratarConexaoWebsocket } from './tratar-conexao-websocket';

export default {
    mounted() {
        tratarConexaoWebsocket(this.$store);
    },
};
