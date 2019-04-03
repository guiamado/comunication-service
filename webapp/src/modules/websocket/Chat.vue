<template>
    <v-container
        fluid>

        <v-layout
            column
            fill-height>
            <v-card

                flat
                dark>
                <v-toolbar
                    dark
                    color="primary">
                    <v-toolbar-title>Chat</v-toolbar-title>
                </v-toolbar>
                <v-form @submit="enviarMensagem">
                    <v-card-text>

                        <v-layout row>
                            <v-flex xs4>
                                <v-layout column>
                                    <v-select
                                        v-model="sistema"
                                        :items="sistemas"
                                        :return-object="true"
                                        item-text="descricao"
                                        label="Sistemas"
                                        light
                                        solo
                                        @change="entrarEmSala"
                                    />
                                    <v-textarea
                                        ref="mensagem"
                                        v-model="mensagem"
                                        solo
                                        label="mensagem"
                                        light
                                        required/>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs5>
                                        <v-btn
                                            v-if="isEnviando == false"
                                            light
                                            color="primary"
                                            @click="enviarMensagem">
                                            Enviar
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs7>
                                        <v-scale-transition>
                                            <v-alert
                                                v-show="websocket.isConnected === true"
                                                :value="true"
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
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs8>
                                {{ websocket }}
                                <v-list
                                    v-if="websocket.salas.length > 0 && websocket.indiceSalaAtual != null"
                                    subheader>
                                    <v-subheader>Mensagens para o Sistema {{ sistema.descricao }}</v-subheader>
                                    <v-list-tile
                                        v-for="(chat, index) in websocket.salas[indiceSalaAtual]"
                                        avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="chat.name"/>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>chat_bubble</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>
                        </v-layout>

                    </v-card-text>
                </v-form>
            </v-card>
        </v-layout>

    </v-container>


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
