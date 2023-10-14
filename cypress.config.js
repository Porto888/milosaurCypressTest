const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '9mpgkq',
  chromeWebSecurity: false,
  e2e: {
    baseurl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768,
    },
    defaultCommandTimeout: 60000,


  },

})
