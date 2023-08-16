// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//



// Trecho de código para preenchimento de formulário
Cypress.Commands.add('preencherEEnviarFormulário', (email, password) => {

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('https://notes-serverless-app.com/signup')
  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')
  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: email
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)
    cy.wait('@getNotes', { timeout: 45000 })
  })
})



// Trecho de código Login Test
Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {

  cy.visit('https://notes-serverless-app.com/login')
  cy.get('#email').type(username)
  cy.get('#password').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes', { timeout: 45000 })
  cy.contains('h1', 'Your Notes').should('be.visible')

})

Cypress.Commands.add('sessionLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(username, password)
  cy.session(username, login)
})


// (creatNote)-> Trecho de código criação de uma nota de arquivo
const attachFileHandler = () => {
  cy.get('#file').selectFile('cypress/fixtures/example.json')
}

Cypress.Commands.add('createNote', (note, attachFile = false) => {
  cy.visit('https://notes-serverless-app.com/notes/new')
  cy.get('#content').type(note)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Create').click()

  cy.contains('.list-group-item', note).should('be.visible')
})

// (editNote)-> Trecho de código edição de uma nota de arquivo criada
Cypress.Commands.add('editNote', (note, newNoteValue, attachFile = false) => {
  cy.intercept('GET', '**/notes/**').as('getNote')

  cy.contains('.list-group-item', note).click()
  cy.wait('@getNote')

  cy.get('#content').as('contetField').clear()
  cy.get('@contetField').type(newNoteValue)

  if (attachFile) {
    attachFileHandler()
  }

  cy.contains('button', 'Save').click()

  cy.contains('.list-group-item', newNoteValue).should('be.visible')
  cy.contains('.list-group-item', note).should('not.exist')
})

// (deletNote)-> Trecho de código para deleção de uma nota de arquivo
Cypress.Commands.add('deleteNote', note => {
  cy.contains('.list-group-item', note).click()
  cy.contains('button', 'Delete').click()

  cy.get('.list-group-item').its('length').should('be.at.least', 1)
  cy.contains('.list-group-item', note).should('not.exist')

})

// Cypress.Commands.add('logs out', () => {
//   cy.visit('https://notes-serverless-app.com')
//   cy.wait('@getNotes', { timeout: 40000 })
// })


// Trecho de código para simular compra utilizando cartão de crédito
// cypress/support/commands.js


Cypress.Commands.add('fillSettingsFormAndSubmit', () => {

  cy.visit('https://notes-serverless-app.com/settings')
  cy.get('#storage').type('1')
  cy.get('#name').type('Magno Porto')
  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242')
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271')
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123')
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345')
  cy.contains('button', 'Purchase').click()
})


// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })