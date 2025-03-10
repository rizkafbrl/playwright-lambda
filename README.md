# playwright-lambda
playwright lambda test

## Setup
1. Install dependencies:
   ```sh
   npm install

2. Run Tests:
   ```sh
   npx playwright test

3. To open the Playwright Test Runner UI:
   ```sh
   npx playwright test --ui

4. Running specific test within a file, use:
   ```sh
   npx playwright test src/tests/form.spec.ts

5. Running specific test within a file, use:
   ```sh
   npx playwright test src/tests/form.spec.ts -g "TC_001: Validate Simple Form Submission"

## Writing Tests
Tests are located in the src/tests directory.
Page Object Models are located in the src/pages directory.

## Folder Structure
   ```sh
   playwright-lambda
   ├── src
   │   ├── pages
   │   │   ├── basePage.ts
   │   │   ├── formPage.ts
   │   │   ├── homePage.ts
   │   │   └── sliderPage.ts
   │   └── tests
   │       ├── form.spec.ts
   │       └── slider.spec.ts
   ├── package.json
   ├── playwright.config.ts
   └── README.md