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

6. Running on local with lamda as the cloud env
   ```sh
   npx playwright test --lambda

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
   ```


### 3. Ensure GitHub Secrets are Set
Add your LambdaTest credentials as secrets in your GitHub repository:

1. Go to your GitHub repository.
2. Click on `Settings`.
3. In the left sidebar, click on `Secrets and variables` and then `Actions`.
4. Click on `New repository secret`.
5. Add [LT_USERNAME](http://_vscodecontentref_/4) and [LT_ACCESS_KEY](http://_vscodecontentref_/5) with your LambdaTest credentials.

### 4. Verify [playwright.yml](http://_vscodecontentref_/6)
Ensure your GitHub Actions workflow file is correctly configured:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Set LambdaTest environment variables
      run: |
        echo "LT_USERNAME=${{ secrets.LT_USERNAME }}" >> $GITHUB_ENV
        echo "LT_ACCESS_KEY=${{ secrets.LT_ACCESS_KEY }}" >> $GITHUB_ENV
    - name: Run Playwright tests
      run: |
        if [ -z "$LT_USERNAME" ] || [ -z "$LT_ACCESS_KEY" ]; then
          echo "Running tests locally"
          npx playwright test
        else
          echo "Running tests on LambdaTest"
          npx playwright test
        fi
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30