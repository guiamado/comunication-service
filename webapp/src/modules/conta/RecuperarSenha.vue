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
                    <v-card class="elevation-12">
                        <v-toolbar
                            dark
                            color="primary">
                            <v-toolbar-title>Recuperar Senha</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                ref="form"
                                v-model="valid"
                                @submit.prevent="tratarSubmissao">
                                
                                <v-text-field
                                    v-validate="'required'"
                                    v-model="user.email"
                                    :rules="[rules.required, rules.email, rules.minLength]"
                                    prepend-icon="person"
                                    label="E-mail"
                                    class="form-control"
                                    required
                                />
                                <div
                                    v-if="submitted && errors.has('email')"
                                    class="invalid-feedback">{{
                                    errors.first('email') }}
                                </div>
                             
                                <v-card-actions>
                                    <v-spacer/>
                                    <router-link
                                        to="/login"
                                        class="btn btn-link">Cancelar</router-link>
                                    <v-spacer/>
                                    <v-btn
                                        to="/redefinir"
                                        :disabled="!valid"
                                        color="primary"
                                        type="submit"> Enviar
                                    </v-btn>
                                    <img v-show="status.registering">
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: {
                email: '',
            },
            submitted: false,
            rules: {
                required: value => !!value || 'E-mail obrigatório.',
                minLength: object => object.length > 3 || 'Campo obrigatório.',
                email: (value) => {
                    // eslint-disable-next-line
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail precisa ser válido.';
                },
            },
            valid: true,
        };
    },
    computed: {
        ...mapState('account', ['status']),
    },
    methods: {
        ...mapActions('conta', ['obterContas']),
        tratarSubmissao() {
            this.submitted = true;
            if (this.$refs.form.validate()) {
                this.obterContas();
            }
        },
    },
};
</script>
