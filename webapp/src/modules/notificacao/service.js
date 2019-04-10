export const notificacaoService = {
    methods: {
        filtrarMensagensVinculadas(value) {
            const self = this;
            value.filter((item) => {
                if (self.usuarioPossuiVinculoComSistema(item.sistema_id) === true) {
                    self.mensagensComVinculo.push(item);
                }
            });

            return self.mensagensComVinculo;
        },
        usuarioPossuiVinculoComSistema(sistemaNotificacao) {
            const self = this;
            const { sistemas } = self.informacoesConta;
            let possuiVinculo = false;
            sistemas.forEach((value) => {
                if (parseInt(value.sistema_id, 10) === parseInt(sistemaNotificacao, 10)) {
                    possuiVinculo = true;
                }
            });

            return possuiVinculo;
        },
    },
};
