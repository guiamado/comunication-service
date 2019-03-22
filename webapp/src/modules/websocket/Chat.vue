<template>
    <v-container
        fluid
        fill-height>
        <v-layout
            align-center
            justify-center>
            <v-flex
                xs12
                sm8
                md4>
                <v-layout
                    column
                    justify-center>
                    <v-card
                        dark
                        class="elevation-12">
                        <v-toolbar
                            dark
                            color="primary">
                            <v-toolbar-title>Chat (WebSocket)</v-toolbar-title>
                        </v-toolbar>
                        <v-form @submit="sendMessage">
                            <v-card-text>
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
                                <v-flex xs12>
                                    <div
                                        ref="mensagem-completa"
                                        style="display: inline">
                                        <span
                                            v-if="sistema != ''"
                                            style="color:dodgerblue">[{{ sistema }}]</span>
                                        <span
                                            v-if="usuario != ''"
                                            style="color:dodgerblue">{{ usuario }}:</span>
                                        <span
                                            v-if="mensagem != ''"
                                            style="color:yellowgreen">{{ mensagem }}</span>
                                    </div>
                                </v-flex>

                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        v-if="isEnviando == false"
                                        light
                                        color="primary"
                                        @click="sendMessage">
                                    Enviar
                                </v-btn>
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
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-layout>
            </v-flex>
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
