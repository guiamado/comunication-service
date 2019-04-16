<template>
    <v-app>
        <barra-lateral v-model="drawer"/>
        <v-toolbar
            :clipped-left="clipped"
            app
            dark
            color="teal darken-4">
            <v-toolbar-side-icon
                v-if="status.loggedIn"
                @click.stop="drawer = !drawer"/>
            <v-toolbar-title v-text="this.$route.name"/>
            <notificacao-badge
                v-show="carregando"
                v-if="status.loggedIn"/>
            <v-spacer/>


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
        </v-toolbar>

        <alerta />
        <router-view/>
        <v-footer
            dark
            height="auto">
            <v-card
                class="flex"
                flat
                color="teal darken-4"
                tile>
                <v-card-actions class="justify-center">
                    <strong>{{ title }}</strong>
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>

import { mapGetters } from 'vuex';
import NotificacaoBadge from './modules/notificacao/NotificacaoBadge.vue';
import BarraLateral from './modules/core/BarraLateral.vue';
import Alerta from './modules/alert/Alerta.vue';

export default {
    name: 'App',
    components: {
        NotificacaoBadge,
        BarraLateral,
        Alerta,
    },
    data() {
        return {
            carregando: false,
            clipped: false,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Notification WebApp',
        };
    },
    computed: {

        ...mapGetters({
            status: 'account/status',
            user: 'account/user',
            isConnected: 'websocket/isConnected',
        }),
    },
    mounted() {
        this.carregando = true;
    },
};
</script>
