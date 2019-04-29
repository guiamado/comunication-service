<template>
    <div>
        <v-scale-transition>
            <v-tooltip
                v-if="status.loggedIn"
                bottom>
                <v-btn
                    v-show="isConnected === true"
                    slot="activator"
                    small
                    icon
                    fab
                    color="teal">
                    <v-icon>check</v-icon>
                </v-btn>
                <span>Conectado</span>
            </v-tooltip>
        </v-scale-transition>
        <v-scale-transition>
            <v-tooltip
                v-if="status.loggedIn"
                bottom>
                <v-btn
                    v-show="isConnected === false"
                    slot="activator"
                    small
                    icon
                    fab
                    color="warning">
                    <v-icon>warning</v-icon>
                </v-btn>
                <span>Desconectado</span>
            </v-tooltip>
        </v-scale-transition>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { tratarConexaoWebsocket } from './_auxiliares/tratar-conexao-websocket';

export default {
    name: 'Chat',
    computed: {
        ...mapGetters({
            status: 'account/status',
            isConnected: 'websocket/isConnected',
        }),
    },
    mounted() {
        tratarConexaoWebsocket(this.$store);
    },
};
</script>
