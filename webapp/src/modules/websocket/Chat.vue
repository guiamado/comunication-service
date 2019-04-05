<template>
    <v-content>
        <v-container
            fluid>


            <v-layout
                align-space-around
                column
            >
                <v-card
                    flat
                    dark
                >
                    <v-toolbar
                        dark
                        color="primary">
                        <v-toolbar-title>{{ sistema.descricao || 'Selecione um sistema' }}</v-toolbar-title>
                        <v-spacer />
                        <v-scale-transition>
                            <v-tooltip bottom>
                                <v-btn
                                    v-show="websocket.isConnected === true"
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
                            <v-tooltip bottom>
                                <v-btn
                                    v-show="websocket.isConnected === false"
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
                    <v-card-text>
                        <v-layout
                            row
                            wrap>
                            <v-flex xs12>
                                <v-list
                                    v-if="websocket.salas.length > 0 && websocket.indiceSalaAtual != null"
                                    subheader>
                                    <template
                                        v-for="(chat) in websocket.salas[websocket.indiceSalaAtual].mensagens">
                                        <v-list-tile
                                            :key="chat.mensagem"
                                            avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="`${chat.usuario.name} < ${chat.usuario.email} >`"/>
                                                <v-list-tile-sub-title v-html="chat.mensagem"/>

                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                </v-list>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-layout>

        </v-container>
        <v-footer
            fixed
            dark
            height="auto">
            <v-card
                class="flex"
                flat
                tile>
                <v-card-text class="">
                    <v-form @submit="enviarMensagem">
                        <v-container
                            grid-list-md
                            text-xs-center>
                            <v-layout
                                row>
                                <v-flex xs10>
                                    <v-select
                                        v-model="sistema"
                                        :items="sistemas"
                                        :return-object="true"
                                        item-text="descricao"
                                        label="Sistemas"
                                        light
                                        solo
                                        @change="entrarEmSala" />
                                    <v-textarea
                                        ref="mensagem"
                                        v-model="mensagem"
                                        solo
                                        label="mensagem"
                                        light
                                        required/>
                                </v-flex>

                                <v-flex xs2>
                                    <v-layout
                                        align-center
                                        justify-center
                                        column
                                        fill-height>
                                        <v-btn
                                            :loading="isEnviando"
                                            :disabled="isEnviando"
                                            light
                                            color="primary"
                                            round
                                            @click="enviarMensagem">
                                            Enviar
                                        </v-btn>

                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-content>


</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Chat',
    data() {
        return {
            isEnviando: false,
            sistema: {},
            mensagem: '',
            sistemas: [],

            isConnected: false,
            socketMessage: '',
        };
    },

    computed: {
        ...mapGetters({
            websocket: 'websocket/websocket',
            accountInfo: 'account/accountInfo',
        }),
    },
    watch: {
        accountInfo() {
            this.sistemas = [];
            this.sistemas.push(this.accountInfo.sistemas);
        },
    },
    mounted() {
        this.sistemas = this.accountInfo.sistemas;
    },
    methods: {
        ...mapActions({
            websocketEntrarEmSala: 'websocket/Socket_serverEntrarEmSala',
            websocketMensagemSala: 'websocket/Socket_serverMensagemSala',
        }),

        entrarEmSala() {
            const self = this;

            this.websocketEntrarEmSala({
                sala: self.sistema.sistema_id,
            });
        },
        enviarMensagem(evento) {
            const self = this;

            this.websocketMensagemSala({
                sala: self.sistema.sistema_id,
                mensagem: self.mensagem,
            });
            self.isEnviando = true;
            setTimeout(() => {
                self.isEnviando = false;
                this.$refs.mensagem.reset();
            }, 1000);
            evento.preventDefault();
        },
    },
};
</script>

<style scoped>

</style>
