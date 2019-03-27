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
                <v-form @submit="sendMessage">
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
                                            @click="sendMessage">
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
                                <v-list subheader>
                                    <v-subheader>Recent Chats</v-subheader>
                                    <v-list-tile avatar v-for="(chat, index) in chats">
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="chat.name"></v-list-tile-title>
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
import { mapGetters } from 'vuex';

export default {
    name: 'WebSocket',
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
        console.log(this.sistemas);
    },
    methods: {
        sendMessage(e) {
            const base = this;
            base.isEnviando = true;

            setTimeout(() => {
                base.isEnviando = false;
            }, 1000);
            // this.websocket.connection.send(`${this.sistema}|${this.usuario}:${this.mensagem}`);
            e.preventDefault();

            this.$refs.mensagem.reset();
        },
    },
};
</script>

<style scoped>

</style>
