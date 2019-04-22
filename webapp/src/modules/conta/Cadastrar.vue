<template>
    <v-content>
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
                                <v-toolbar-title>Cadastrar</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                    ref="form"
                                    lazy-validation
                                    @submit.prevent="tratarSubmissao">
                                    <v-text-field
                                        v-validate="'required'"
                                        v-model="user.nome"
                                        :rules="[rules.required, rules.minLength]"
                                        prepend-icon="face"
                                        label="Nome"
                                        class="form-control"
                                        required
                                    />
                                    <v-text-field
                                        v-validate="'required'"
                                        v-model="user.email"
                                        :rules="[rules.required, rules.email, rules.minLength]"
                                        prepend-icon="person"
                                        label="E-mail"
                                        class="form-control"
                                        required
                                    />
                                    <v-text-field
                                        v-validate="{ required: true, min: 6 }"
                                        v-model="user.password"
                                        :rules="[rules.required, rules.minLength]"
                                        prepend-icon="lock"
                                        type="password"
                                        label="Senha"
                                        class="form-control"
                                        required
                                    />
                                    <v-card-actions>
                                        <v-spacer/>
                                        <router-link
                                            to="/login"
                                            class="btn btn-link">Cancel</router-link>
                                        <v-spacer/>
                                        <v-btn
                                            :disabled="status.registrando"
                                            color="primary"
                                            type="submit"> Cadastrar
                                        </v-btn>
                                        <img v-show="status.registrando">
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: {
                nome: '',
                email: '',
                password: '',
            },
            rules: {
                required: value => !!value || 'Campo obrigatório.',
                minLength: object => object.length > 5 || 'Campo obrigatório.',
                email: (value) => {
                    // eslint-disable-next-line
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'E-mail obrigatório.';
                },
            },
        };
    },
    computed: {
        ...mapState('account', ['status']),
    },
    methods: {
        ...mapActions({
            registrar: 'account/registrar',
            enviarEmail: 'conta/enviarEmail',
        }),
        tratarSubmissao() {
            if (this.$refs.form.validate()) {
                this.registrar(this.user);
                this.enviarEmail(this.user);
            }
        },
    },
};
</script>
