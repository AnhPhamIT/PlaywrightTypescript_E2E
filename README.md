# Framework & E2E tests

### Projects covered with E2E tests(used in configuration):

- LambdaTest

### System requirements

### Installation

- `npm install`

### Usage

1. Create our .env file from .env.example
2. Complete the project and environment
3. `npm run test` All tests within selected project on selected environment in chromium(by default) browser.

### Run locally

Sometimes it is helpful to run e2e test suite againts your balanced server locally, one needs to properly config e2e as follow.

1. Create a new .env file and overwrite with these values:

```
PROJECT=LambdaTest
TEST_ENVIRONMENT=QA
```
2. Run command

```
npx playwright test --trace on --workers 1
```

_Note_: If one find tests run too slow, speed it up by:

- Increasing number of workers running concurrently (eg. `--workers 4`).
- Decreasing slow motion by editing field `slowMo` in file `playwright.config.ts`.

Beware speeding up may cause more flakiness from tests.

