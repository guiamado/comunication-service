<template>
    <v-content>
        <v-container
            fluid>
            <v-layout
                align-space-around
                column>

                <v-card
                    class="mx-auto"
                    flat
                    light>


                    <v-toolbar
                        dark
                        color="primary">
                        <v-toolbar-title>{{ websocket.nomeSalaAtual || 'Selecione um sistema' }}</v-toolbar-title>
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
                    <v-card-text style="height:calc(100vh - 300px); overflow-y: auto">
                        <v-window v-model="numeroJanela">
                            <v-window-item :value="1">
                                <v-card-text>
                                    <v-select
                                        v-model="sistema"
                                        :items="sistemas"
                                        :return-object="true"
                                        item-text="descricao"
                                        label="Sistemas"
                                        light
                                        solo />
                                </v-card-text>
                            </v-window-item>

                            <v-window-item :value="2">
                                <v-card-text>
                                    <v-list
                                        v-if="websocket.salas.length > 0 && websocket.indiceSalaAtual != null"
                                        subheader>
                                        <template
                                            v-for="(chat) in websocket.salas[websocket.indiceSalaAtual].mensagens">
                                            <v-list-tile
                                                :key="chat.mensagem"
                                                avatar>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="obterTituloMensagem(chat)"/>
                                                    <v-list-tile-sub-title v-html="chat.mensagem"/>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </template>
                                    </v-list>
                                </v-card-text>
                            </v-window-item>
                        </v-window>
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions>
                        <v-btn
                            :disabled="numeroJanela === 1"
                            flat
                            @click="numeroJanela--">
                            Voltar
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            v-if="numeroJanela === 1"
                            color="primary"
                            depressed
                            @click="entrarEmSala">
                            Entrar
                        </v-btn>
                        <v-card
                            v-if="numeroJanela === 2"
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
                                            <v-flex xs8>

                                                <v-text-field
                                                    ref="mensagem"
                                                    v-model="mensagem"
                                                    solo
                                                    label="mensagem"
                                                    light
                                                    required/>
                                            </v-flex>

                                            <v-flex xs4>
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

                    </v-card-actions>
                </v-card>
            </v-layout>

        </v-container>


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

            numeroJanela: 1,
        };
    },

    computed: {
        ...mapGetters({
            websocket: 'websocket/websocket',
            accountInfo: 'account/accountInfo',
        }),

        currentTitle() {
            switch (this.numeroJanela) {
            case 1: return 'Sign-up';
            case 2: return 'Create a password';
            default: return 'Account created';
            }
        },
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
            definirNomeSalaAtual: 'websocket/definirNomeSalaAtual',
        }),

        entrarEmSala() {
            const self = this;

            this.websocketEntrarEmSala({
                sala: self.sistema.sistema_id,
            });
            this.definirNomeSalaAtual({
                nomeSalaAtual: self.sistema.descricao,
            });
            self.numeroJanela += self.numeroJanela;
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
            }, 400);
            evento.preventDefault();
        },

        obterTituloMensagem(chat) {
            const horarioFormatado = this.$options.filters.formataData(chat.horario);
            return `${chat.usuario.name} [${horarioFormatado}]`;
        },
    },

};
</script>

<style scoped>

</style>
