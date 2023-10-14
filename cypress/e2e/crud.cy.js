import { faker } from '@faker-js/faker/locale/en'

/// <reference path="../support/commands.d.ts" />

// Exemplo de codificção utilizando o arquivo commands

describe('CRUD', () => {
  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(10)

    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updateNoteDescription = faker.lorem.words(10)
    const attachFile = true

    cy.editNote(noteDescription, updateNoteDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(updateNoteDescription)
    cy.wait('@getNotes')

  })
})

// Exemplo de codificção sem utilizar o arquivo commands

// describe('CRUD', () => {
//   it('CRUDs a note', () => {
//     const noteDescription = faker.lorem.words(4)

//     cy.intercept('GET', '**/notes').as('getNotes')
//     cy.intercept('GET', '**/notes/**').as('getNote')
//     cy.sessionLogin()

//     cy.visit('https://notes-serverless-app.com/notes/new')
//     cy.get('#content').type(noteDescription)

//     if (attachFile) {
//       cy.get('#file').selectFile('cypress/fixtures/example.json')
//     }
//     cy.contains('button', 'Creat').click()

//     cy.wait('@getNotes')
//     cy.contains('.list-group-item', noteDescription).should('be.visible').click()
//     cy.wait('@getNote')

//     const updateNoteDescription = faker.lorem.words(4)

//     cy.get('#content').as('contentField').clear()
//     cy.get('@contentField').type(updateNoteDescription)

//     attachFile = true

//     if (attachFile) {
//       cy.get('#file').selectFile('cypress/fixtures/example.json')
//     }
//     cy.contains('button', 'Save').click()
//     cy.wait('@getNotes')

//     cy.contains('.list-group-item', noteDescription).should('not.exist')
//     cy.contains('.list-group-item', updateNoteDescription).should('be.visible').click()
//     cy.wait('@getNote')
//     cy.contains('button', 'Delete').click()
//     cy.wait('@getNotes')
//     cy.get('.list-group-item').its('length').should('be.at.least', 1)
//     cy.contains('.list-group-item', updateNoteDescription).should('not.exist')

//   })
// })