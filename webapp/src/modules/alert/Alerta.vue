<template>
    <div
        v-if="alert.mensagem != null && alert.tipoMensagem != null"
        :color="alert.tipoMensagem">
        <v-snackbar
            :value="true"
            :top="top"
            :timeout="timeout"
            :color="color"
            :vertical="false"
            transition="scale-transition"
            dismissible>
            {{ alert.mensagem }}
            <slot/>
            <v-btn
                dark
                flat
                @click="snackbar = false">
                Fechar
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Alerta',
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        timeout: 6000,
        snackbar: false,
        top: false,
    }),
    computed: {
        ...mapGetters({
            mensagem: 'alert/mensagem',
            tipoMensagem: 'alert/tipoMensagem',
        }),
    },
    watch: {
        color() {
            this.snackbar = true;
        },
    },
    methods: {
        ...mapActions({
            limpar: 'alert/limpar',
        }),
    },
};
</script>
