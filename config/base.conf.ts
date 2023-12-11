import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },
  specs: [
    '../test/specs/**/*e2e.ts'
  ],

  maxInstances: 1,

  suites: {
    e2eTest: ['../test/specs/**/*e2e.ts']
  },

  exclude: [
  ],
  capabilities: [
    {
      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],
  bail: 0,
  waitforTimeout: 40000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: [
    'spec'
  ],
  logLevel: 'error',
  mochaOpts: {
    ui: 'bdd',
    timeout: 9000000,
  },
  async before() {
    await browser.setWindowSize(1280, 1008)
  },
  async afterTest( test, { error }) {
    if (error) {
      await browser.saveScreenshot('./screenshots/failure_' + test['title'].replace(/\s+/g, '_') + '.png')
    }
  },
}
