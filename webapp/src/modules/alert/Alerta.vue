<template>
    <div
        v-if="mensagem != null && tipoMensagem != null"
        :color="tipoMensagem">
        <v-snackbar
            :value="true"
            :top="top"
            :timeout="tempoDeDuracao"
            :color="color"
            :vertical="false"
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
        snackbar: false,
        top: false,
        color: true,
    }),
    computed: {
        ...mapGetters({
            mensagem: 'alert/mensagem',
            tipoMensagem: 'alert/tipoMensagem',
            tempoDeDuracao: 'alert/tempoDeDuracao',
        }),
    },
    methods: {
        ...mapActions({
            limpar: 'alert/limpar',
        }),
    },
};
</script>
