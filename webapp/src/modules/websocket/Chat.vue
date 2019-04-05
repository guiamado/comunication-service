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
                                        v-for="(chat, index) in websocket.salas[websocket.indiceSalaAtual].mensagens">
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
                                            v-show="isEnviando == false"
                                            light
                                            color="primary"
                                            round
                                            @click="enviarMensagem">
                                            Enviar
                                        </v-btn>
                                        <v-scale-transition>
                                            <v-alert
                                                v-show="websocket.isConnected === true"
                                                :value="true"
                                                outline
                                                type="success"> Conectado
                                            </v-alert>
                                        </v-scale-transition>
                                        <v-scale-transition>
                                            <v-alert
                                                v-show="websocket.isConnected === false"
                                                :value="true"
                                                type="error"> Desconectado
                                            </v-alert>
                                        </v-scale-transition>
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
            usuario: '',
            sistema: {},
            mensagem: '',
            mensagens: [],
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
        websocket(data) {
            console.log(data);
        },
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
        }),

        entrarEmSala() {
            const self = this;

            this.websocketEntrarEmSala({
                sala: self.sistema.sistema_id,
            });
        },
        enviarMensagem(e) {
            const self = this;
            self.isEnviando = true;
            //
            // setTimeout(() => {
            //     self.isEnviando = false;
            // }, 1000);
            //
            // e.preventDefault();
            //
            // this.$refs.mensagem.reset();
            //
            // this.$socket.emit('emit_method', data);
        },
    },
};
</script>

<style scoped>

</style>
