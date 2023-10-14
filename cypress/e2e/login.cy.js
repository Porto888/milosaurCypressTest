/// <reference path="../support/commands.d.ts" />

describe('Login', () => {
  it('login realizado com sucesso', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.guiLogin()
    cy.contains('a', 'Create a new note').should('be.visible')
  })
})