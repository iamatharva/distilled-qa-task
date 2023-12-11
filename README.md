# Distilled QA Automation Task

Welcome to the E2E Test Automation Framework

Framework Details: Mocha using Webdriver IO `https://webdriver.io/` | Pattern: Page Object Pattern | Assertions: Expect

## Installation and Access:

1. Install Lastest [Docker](https://www.docker.com).
2. Install [Node 18.16.0](https://nodejs.org/en/) OR use nvm command (https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

   ```
   nvm use
   ```

3. Install latest [Google Chrome](https://www.google.com/intl/en_in/chrome/).
4. Make sure your NPM version is 9.5.1, To check use below command.

   ```
   npm -v
   ```

5. Please make sure you always up to date your google chrome version for local test run and that should also match with the [latest chrome driver stable version][https://chromedriver.chromium.org/], if not then please update the [package file](package.json) and push the latest one if released recently. Also please have a look to the below for updating the chromedriver image locally and in CI both.

### Running the test

## Local Development of test

#### Running the test cases locally.

- To run all the tests in UI mode

  ```
  npm run test:headful
  ```

- To run all the tests in headless mode

  ```
  npm run test:headless
  ```

Note: Make sure when you run the test using the above command you do not click or interact with machine and allow automated test to run and perform the execution without interferring.

#### Running Test in Docker

To start running test on your machine
 1. Start local docker instance if not running locally and if required
 2. Start the following command

  ```
  make run_e2e_test
  ```

### Static Analysis before commit

- Run [ESLint](https://eslint.org/)

  ```
  npm run lint
  ```

### Log level while running the test

Level of logging verbosity: `trace` | `debug` | `info` | `warn` | `error` | `silent`
Change the value for log level from above mentioned values [config file](./config/base.conf.js)

    ```
    logLevel: 'error'
    ```

### Updating the chromedriver image locally and in CI both

We can update the chromedriver image locally as well as on CI both by manually change it in package.jsona nd Dockerfile and making it in sync.
