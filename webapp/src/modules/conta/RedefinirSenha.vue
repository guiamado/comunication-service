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
                            <v-toolbar-title>Redefinir Senha</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                ref="form"
                                v-model="valid"
                                @submit.prevent="tratarSubmissao">
                                <v-text-field
                                    v-model="user.novaSenha"
                                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.required, rules.minLength]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    v-validate="{ required: true, min: 6 }"
                                    prepend-icon="lock"
                                    label="Nova Senha"
                                    class="form-control"
                                    autocomplete="off"
                                    required
                                    @click:append="show1 = !show1"
                                />
                                <div
                                    v-if="submitted && errors.has('password')"
                                    class="invalid-feedback">{{ errors.first('password') }}
                                </div>
                                <v-text-field
                                    v-model="user.confirmarSenha"
                                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.required, rules.minLength]"
                                    :type="show2 ? 'text' : 'password'"
                                    name="input-10-2"
                                    v-validate="{ required: true, min: 6 }"
                                    prepend-icon="redo"
                                    label="Confirmar Senha"
                                    class="form-control"
                                    autocomplete="off"
                                    required
                                    @click:append="show2 = !show2"
                                />
                                <div
                                    v-if="submitted && errors.has('password')"
                                    class="invalid-feedback">{{ errors.first('password') }}
                                </div>
                             
                                <v-card-actions>
                                    <v-spacer/>
                                    <router-link
                                        to="/login"
                                        class="btn btn-link">Cancelar</router-link>
                                    <v-spacer/>
                                    <v-btn
                                        :disabled="!valid"
                                        color="primary"
                                        type="submit"> Salvar
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
            show1: false,
            show2: false,
            password: 'Confirmar Senha',
            user: {
                novaSenha: '',
                confirmarSenha: '',
            },
            submitted: false,
            rules: {
                required: value => !!value || 'Senha obrigatória.',
                minLength: object => object.length > 5 || 'Senha precisa ser válida.',
                email: (value) => {
                    // eslint-disable-next-line
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Senha precisa ser válida.';
                },
            },
            valid: true,
        };
    },
    computed: {
        ...mapState('account', ['status']),
    },
    methods: {
        ...mapActions('account', ['register']),
        tratarSubmissao() {
            this.submitted = true;
            if (this.$refs.form.validate()) {
                this.register(this.user);
            }
        },
    },
};
</script>
