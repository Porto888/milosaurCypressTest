const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '9mpgkq',
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      require('plugin@cypress/grep/src/plugin')(config)
      return config
    },
    baseurl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768,
    },
    defaultCommandTimeout: 60000,


  },

})
