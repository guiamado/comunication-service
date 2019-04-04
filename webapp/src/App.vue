<template>
    <v-app>
        <barra-lateral v-model="drawer"/>
        <v-toolbar
            :clipped-left="clipped"
            app
            dark
            color="primary">
            <v-toolbar-side-icon
                v-if="status.loggedIn"
                @click.stop="drawer = !drawer"/>
            <v-toolbar-title v-text="title"/>
            <notificacao-badge
                v-show="loading"
                v-if="status.loggedIn"/>
            <v-spacer/>
            <span>
                Usuários Conectados ({{ websocket.connectedUsers }})
            </span>
        </v-toolbar>

        <alerta
            v-if="alert.message != null && alert.message_type != null"
            :color="alert.message_type">{{ alert.message }}</alerta>
        <router-view/>
        <v-footer
            dark
            height="auto">
            <v-card
                class="flex"
                flat
                tile>
                <v-card-actions class="grey darken-3 justify-center">
                    <strong>{{ title }}</strong>
                </v-card-actions>
            </v-card>
        </v-footer>
        <!--<v-footer :fixed="fixed" app>-->
        <!--<span>&copy; 2018</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
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
            loading: false,
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
        ...mapState({
            alert: state => state.alert,
            // isLoggedIn: state => state.isLoggedIn
            // status: state => state.status
        }),
        ...mapGetters({
            status: 'account/status',
            user: 'account/user',
            accountInfo: 'account/accountInfo',
            websocket: 'websocket/websocket',
        }),
    },
    mounted() {
        this.loading = true;
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear',
        }),
    },
};
</script>
