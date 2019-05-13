describe('Testando Tela Inicial', function() {
    it('Cria Notificacao', function() {
        visitLoginPage()
        loginWith()
        cy.wait(1000)
        menuNotificacao()
        cy.get('.v-btn--bottom').click()
        cy.wait(1000)
        cy.get('textarea').type('[{{}cod_grupo: 1234, pronac: 123456}]')
        cy.wait(1000)
        cy.get('.xs12 > .v-select > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click()
        cy.wait(2000)
        cy.get('.v-menu__content--fixed > .v-select-list > .v-list > :nth-child(1) > .v-list__tile > .v-list__tile__content').click()
        cy.get('.blue > .v-btn__content').click()
        cy.wait(2000)
        cy.visit('http://' + Cypress.env('VUE_APP_HOST') + ':' + Cypress.env('VUE_APP_PORT') + '/notificacao')
        cy.wait(2000)
    })
    it('Ler Notificacao', function () {
        visitLoginPage()
        loginWith()
        cy.wait(1000)
        menuNotificacao()
        cy.wait(1000)
        cy.get('.v-badge > .v-icon').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .primary--text > .v-list__tile__action > .v-tooltip > span > .v-btn > .v-btn__content > .v-icon').click()
        cy.wait(1000)
        cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .v-btn').click()
    })
    it('Excluir Notificacao', function () {
        visitLoginPage()
        loginWith()
        cy.wait(1000)
        menuNotificacao()
        cy.wait(1000)
        cy.get(':nth-child(1) > .justify-center > .v-btn > .v-btn__content > .v-icon').click()
    })
})

const visitLoginPage = () => {
    cy.visit('http://' + Cypress.env('VUE_APP_HOST') + ':' + Cypress.env('VUE_APP_PORT') + '/login')
}

const loginWith = () => {
    cy.get('[name="email"]')
        .type('abcd@gmail.com')
    cy.wait(1000)
    cy.get('[name="password"]')
        .type('123456')
    cy.wait(1000)
    cy.get('.v-btn').click()
}

const menuNotificacao = () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click()
    cy.wait(1000)
    cy.get('.pt-0 > :nth-child(3) > .v-list__tile').click()
}
