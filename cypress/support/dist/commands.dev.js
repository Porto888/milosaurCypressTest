"use strict";

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
// -- This is a parent command --
Cypress.Commands.add('preencherEEnviarFormulário', function (email, password) {
  cy.intercept('GET', '**/notes').as('getNotes');
  cy.visit('https://notes-serverless-app.com/signup');
  cy.get('#email').type(email);
  cy.get('#password').type(password, {
    log: false
  });
  cy.get('#confirmPassword').type(password, {
    log: false
  });
  cy.contains('button', 'Signup').click();
  cy.get('#confirmationCode').should('be.visible');
  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: email
  }).then(function (message) {
    var confirmationCode = message.html.body.match(/\d{6}/)[0];
    cy.get('#confirmationCode').type("".concat(confirmationCode, "{enter}"));
    cy.wait('@getNotes', {
      timeout: 45000
    });
  });
}); // Login Test

Cypress.Commands.add('guiLogin', function () {
  var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Cypress.env('USER_EMAIL');
  var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Cypress.env('USER_PASSWORD');
  cy.visit('https://notes-serverless-app.com/login');
  cy.get('#email').type(username);
  cy.get('#password').type(password, {
    log: false
  });
  cy.contains('button', 'Login').click();
  cy.wait('@getNotes', {
    timeout: 45000
  });
  cy.contains('h1', 'Your Notes').should('be.visible');
});
Cypress.Commands.add('sessionLogin', function () {
  var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Cypress.env('USER_EMAIL');
  var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Cypress.env('USER_PASSWORD');

  var login = function login() {
    return cy.guiLogin(username, password);
  };

  cy.session(username, login);
}); // (creatNote)-> Comando para criação de uma nota de arquivo

var attachFileHandler = function attachFileHandler() {
  cy.get('#file').selectFile('cypress/fixtures/example.json');
};

Cypress.Commands.add('createNote', function (note) {
  var attachFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  cy.visit('/notes/new');
  cy.get('#content').type(note);

  if (attachFile) {
    attachFileHandler();
  }

  cy.contains('button', 'Create').click();
  cy.contains('.list-group-item', note).should('be.visible');
}); // (editNote)-> Comando para edição de uma nota de arquivo criada

Cypress.Commands.add('editNote', function (note, newNoteValue) {
  var attachFile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  cy.intercept('GET', '**/notes/**').as('getNote');
  cy.contains('.list-group-item', note).click();
  cy.wait('@getNote');
  cy.get('#content').as('contetField').clear();
  cy.get('@contetField').type(newNoteValue);

  if (attachFile) {
    attachFileHandler();
  }

  cy.contains('button', 'Save').click();
  cy.contains('.list-group-item', newNoteValue).should('be.visible');
  cy.contains('.list-group-item', note).should('not.exist');
}); // (deletNote)-> Comando para deleção de uma nota de arquivo

Cypress.Commands.add('deleteNote', function (note) {
  cy.contains('.list-group-item', note).click();
  cy.contains('button', 'Delete').click();
  cy.get('.list-group-item').its('length').should('be.at.least', 1);
  cy.contains('.list-group-item', note).should('not.exist');
}); // -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })