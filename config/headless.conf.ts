import type { Options } from '@wdio/types'
import { config as baseConfig } from './base.conf'

export const config: Options.Testrunner = {
  ...baseConfig,
  capabilities: [
    {
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: ['--no-sandbox', '--disable-infobars', '--headless=new', '--disable-gpu', '--disable-dev-shm-usage']
      },
    },
  ],
  logLevel: 'error',
}
