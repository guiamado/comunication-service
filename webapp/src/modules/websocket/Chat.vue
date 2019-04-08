<template>
    <v-content>
        <v-container
            fluid>
            <v-layout
                align-space-around
                column>

                <v-card
                    class="mx-auto"
                    light>

                    <v-toolbar
                        dark
                        prominent
                        color="primary">
                        <v-toolbar-title>
                            {{ (websocket.nomeSalaAtual) ? `Sala ${websocket.nomeSalaAtual}` : 'Selecione um sistema' }}

                        </v-toolbar-title>
                        <v-spacer/>

                        <v-scale-transition>
                            <v-tooltip
                                bottom>
                                <v-badge
                                    v-if="numeroJanela === 2 && typeof websocket.salas[websocket.indiceSalaAtual] != 'undefined'"
                                    slot="activator"
                                    right
                                    color="red">
                                    <span slot="badge">{{ websocket.salas[websocket.indiceSalaAtual].membros.length }}</span>
                                    <!--<span slot="badge"></span>-->
                                    <v-icon
                                        color="glue lighten-1"
                                        large>
                                        account_circle
                                    </v-icon>
                                </v-badge>
                                <template
                                    v-if="numeroJanela === 2 && typeof websocket.salas[websocket.indiceSalaAtual] != 'undefined'">
                                    <h3>Membros da Sala:</h3>
                                    <div v-for="(membro) in websocket.salas[websocket.indiceSalaAtual].membros">
                                        <div>{{ membro.nome }} <{{ membro.email }}></div>
                                    </div>
                                </template>
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
                                                    <v-list-tile-sub-title v-html="obterTextoMensagem(chat)"/>

                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-divider
                                                :key="chat.mensagem"
                                            />
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
                        <v-divider
                            class="mx-3"
                            inset
                            vertical
                        />
                        <v-spacer />
                        <v-btn
                            v-if="numeroJanela === 1"
                            color="primary"
                            depressed
                            right
                            @click="entrarEmSala">
                            Entrar
                        </v-btn>
                        <div
                            v-if="numeroJanela === 2">
                            <v-form @submit="enviarMensagem">
                                <v-container
                                    grid-list-md
                                    text-xs-center>
                                    <v-layout
                                        text-xs-center
                                        row>
                                        <v-flex xs9>

                                            <v-text-field
                                                ref="mensagem"
                                                v-model="mensagem"
                                                solo
                                                label="mensagem"
                                                light
                                                style="height: 45px;"
                                                required/>
                                        </v-flex>

                                        <v-flex xs3>
                                            <v-btn
                                                :loading="isEnviando"
                                                :disabled="isEnviando"
                                                light
                                                color="primary"
                                                round
                                                @click="enviarMensagem">
                                                Enviar
                                            </v-btn>

                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-form>
                        </div>

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

        hasMembrosNaSalaAtual() {
            if (this.websocket.indiceSalaAtual == null) {
                return false;
            }
            const { indiceSalaAtual } = this.websocket;

            if (typeof this.websocket.salas[indiceSalaAtual] === 'undefined') {
                return false;
            }

            const membrosSalaAtual = this.websocket.salas[indiceSalaAtual].membros;
            if (typeof membrosSalaAtual === 'undefined') {
                return false;
            }
            return membrosSalaAtual.length > 0;
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
            return `${chat.usuario.name}`;
        },
        obterTextoMensagem(chat) {
            const horarioFormatado = this.$options.filters.formataData(chat.horario);
            return `[${horarioFormatado}] ${chat.mensagem}`;
        },

    },

};
</script>

<style scoped>

</style>
