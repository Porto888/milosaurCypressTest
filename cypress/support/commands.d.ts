// cypress/support/commands.d.ts

/// <tipos de referência="cypress" />

declarar espaço para nome Cypress {
    interface encadeável {
      /**
       * Efetua login no aplicativo Scratch por meio da interface gráfica do usuário (GUI).
       *
       * @param nome de usuário string – O e-mail do usuário com quem você deseja fazer login
       * @param password string – A senha do usuário com o qual você deseja fazer login
       *
       * @example cy.guiLogin() // Efetua login no aplicativo usando o e-mail e a senha padrão (definidos como envs)
       * @example cy.guiLogin('user@email.com', 'S3cRe7P@ssW0rd') // Efetua login no aplicativo usando as credenciais fornecidas
       */
    guiLogin(nome de usuário?: string, senha?: string): void | Cypress.Chainable<nulo>

     /**
      * Efetua login no aplicativo Scratch via GUI **uma vez** e cria uma sessão neste processo
      * para posterior restauração. Desta forma, não se perde tempo quando a autenticação é apenas uma
      * pré-condição do teste em vez de seu foco principal.
      *
      * O nome de usuário é usado como ID da sessão, o que significa que se ele mudar, por exemplo, quando
      * fazendo login com um usuário diferente, uma nova sessão é criada (via GUI) e salva para
      * restauração adicional.
      *
      * @param nome de usuário string – O e-mail do usuário com quem você deseja fazer login
      * @param password string – A senha do usuário com o qual você deseja fazer login
      *
      * @example cy.sessionLogin() // Efetua login no aplicativo (ou simplesmente restaura a sessão) usando o e-mail e a senha padrão (definidos como envs)
      * @example cy.sessionLogin('user@email.com', 'S3cRe7P@ssW0rd') // Efetua login no aplicativo (ou simplesmente restaura a sessão) usando as credenciais fornecidas
      */
    sessionLogin(username?: string, password?: string): void | Cypress.Chainable<null>

      /**
      * Creates a new note with the possibility of attaching the `example.json` fixture file.
      *
      * @param note string - The text of the note you want to create
      * @param attachFile boolean - A boolean (`true` or `false`) defining if you want or not to attach a file when creating the note (default is `false`)
      *
      * @example cy.createNote('Feed the cat') // Creates a note with the provided description
      * @example cy.createNote('Learn Cypress', true) // Creates a note with the provided description, and attaches the `example.json` fixture file to it
      */
    createNote(nota: string, attachmentFile?: boolean): Cypress.Chainable<indefinido>

      /**
       * Edita uma nota já existente.
       *
       * @param note string – O texto da nota que você deseja editar
       * @param newNoteValue string – O novo valor da nota que você deseja editar
       * @param attachmentFile boolean - Um booleano (`true` ou `false`) que define se você deseja ou não anexar um arquivo ao editar a nota (o padrão é `false`)
       *
       * @example cy.editNote('Aprenda Cypress', 'Aprenda Cypress na escola online TAT') // Edita a descrição da nota com o texto 'Aprenda Cypress' para 'Aprenda Cypress na escola online TAT'
       * @example cy.editNote('Aprenda Cypress', 'Aprenda Cypress na escola online TAT', true) // Edita a descrição da nota com o texto 'Aprenda Cypress' para 'Aprenda Cypress na escola online TAT', e anexa o arquivo de fixture `example.json` a ele
       */ 
    editNote(note: string, newNoteValue: string, attachFile?: boolean): Cypress.Chainable<undefined>

      /**
       * Deletes a note.
       *
       * @param note string - The text of the note you want to delete
       *
       * @example cy.deleteNote('Feed the cat') // Deletes a note with the provided description
       */
    deleteNote(note: string): Cypress.Chainable<undefined>
  
      /**
       * Fills in the settings form with sample data and submits it.
       *
       * @example cy.fillSettingsFormAndSubmit() // Visits the settings page, fills in the form with sample data, and submits it
       */
    fillSettingsFormAndSubmit(): Cypress.Chainable<JQuery<HTMLButtonElement>>

      /**
       * Fills in the signup form and submits it with the provided credentials.
       *
       * After that, enters a six digits code sent to the email used in the previous
       * step, and submits the second form.
       *
       * Finally, waits for the `@getStories` request to ensure the signup succeeded.
       *
       * @param email string - The email of a still not signed up user
       * @param password string - The password for the user being signed up
       *
       * @example cy.fillSignupFormAndSubmit('some-user@example.com', 'sEcR37-p@s5w0rD')
       */
      fillSignupFormAndSubmit(email: string, password: string): Cypress.Chainable<JQuery<HTMLElement>>
    }
  }