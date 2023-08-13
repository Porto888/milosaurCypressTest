
import { faker } from '@faker-js/faker/locale/en'

describe('Sign up', () => {
  const emailAdderess = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`
  const password = Cypress.env('USER_PASSWORD')
  it('inscrição realizada com sucesso utilizando codigo de confirmação enviado por e-mail ', () => {
    cy.preencherEEnviarFormulário(emailAdderess, password)

    cy.contains('h1', 'Your Notes').should('be.visible')
    cy.contains('a', 'Create a new note').should('be.visible')
  })
})


