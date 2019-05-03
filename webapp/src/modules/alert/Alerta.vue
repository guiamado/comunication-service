<template>
    <div
        v-if="mensagem != null && tipoMensagem != null">
        <v-snackbar
            v-model="situacaoSnackbar"
            :value="true"
            :top="top"
            :timeout="tempoDeDuracao"
            :vertical="false"
            :color="tipoMensagem"
            transition="scale-transition"
            dismissible>
            {{ mensagem }}
            <slot/>
            <v-btn
                dark
                flat
                @click="limpar">
                Fechar
            </v-btn>
        </v-snackbar>
    </div>

</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Alerta',
    data: () => ({
        top: false,
        situacaoSnackbar: false,
    }),
    computed: {
        ...mapGetters({
            mensagem: 'alert/mensagem',
            tipoMensagem: 'alert/tipoMensagem',
            tempoDeDuracao: 'alert/tempoDeDuracao',
            snackbar: 'alert/snackbar',
        }),
    },
    watch: {
        snackbar(valor) {
            this.situacaoSnackbar = valor;
        },
        situacaoSnackbar(valor) {
            if (valor === false) {
                this.limpar();
            }
        },
    },
    methods: {
        ...mapActions({
            limpar: 'alert/limpar',
        }),
    },
};
</script>
