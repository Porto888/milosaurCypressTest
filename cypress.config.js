const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseurl: 'https://notes-serverless-app.com',
    defaultCommandTimeout: 45000,
    setupNodeEvents(on, config) {
    },
  },
})
