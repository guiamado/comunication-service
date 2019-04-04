<template>
    <v-content>
        <div>
            <v-snackbar
                :value="true"
                :top="false"
                :timeout="timeout"
                :color="color"
                :vertical="false"
                transition="scale-transition"
                dismissible>
                <slot/>
                <v-btn
                    dark
                    flat
                    @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>
        </div>
    </v-content>
</template>
<script>
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
        top: true,
    }),
    watch: {
        color(value) {
            console.log(value);
            this.snackbar = true;
        },
    },
};
</script>
