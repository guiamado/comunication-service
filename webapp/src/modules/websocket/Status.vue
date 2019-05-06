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

import { mapGetters, mapActions } from 'vuex';
import WebSocketMixins from './_auxiliares/mixins';

export default {
    name: 'Chat',
    mixins: [WebSocketMixins],
    props: {
        communicationToken: {
            type: String,
            default: localStorage.getItem('communication_token'),
        },
    },
    computed: {
        ...mapGetters({
            status: 'comunicationAccount/status',
            isConnected: 'comunicationWebsocket/isConnected',
            informacoesConta: 'comunicationAccount/informacoesConta',
        }),
    },
    watch: {
        communicationToken(valor) {
            localStorage.setItem('communication_token', valor);
        },
    },
    mounted() {
        if (this.informacoesConta == null || this.informacoesConta.email == null) {
            this.definirInformacoesConta(this.communicationToken);
        }
    },
    methods: {
        ...mapActions({
            definirInformacoesConta: 'comunicationAccount/definirInformacoesConta',
        }),
    },
};
</script>
