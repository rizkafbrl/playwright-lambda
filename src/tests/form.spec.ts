import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/formPage';

test.describe('Form Tests', () => {
  test('TC_001: Validate Simple Form Submission', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.navigateTo('https://www.lambdatest.com/selenium-playground');
    await page.locator('text=Simple Form Demo').click();

    const inputMessage = "Welcome to LambdaTest";
    await formPage.fillForm(inputMessage);

    const displayedMessage = await formPage.getDisplayedMessage();
    expect(displayedMessage).toBe(inputMessage);
  });

  test('TC_003: Submit Input Form and Validate Error Messages', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.navigateTo('https://www.lambdatest.com/selenium-playground');
    await page.locator('text=Input Form Submit').click();

    // Step 2: Click "Submit" without filling in any information in the form
    const submitButton = page.locator('button:has-text("Submit")');
    await submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await submitButton.click();

    // Step 3: Assert "Please fill in the fields" error message
    const errorMessage = await formPage.getErrorMessage();
    await expect(errorMessage).toBe('Please fill in the fields');

    // Step 4: Fill in Name, Email, and other fields
    const formData = {
      name: 'Rizka Febrila',
      email: 'rizkafbrl@gmail.com',
      phone: '1234567890',
      company: 'LambdaTest',
      website: 'https://example.com',
      address: 'Apt. Puri Park View',
      city: 'Jakarta',
      state: 'JKT',
      zip: '10001',
      comment: 'This is a test message.',
      country: 'United States' // Step 5: Select "United States" from the Country drop-down
    };

    await formPage.submitForm(formData);

    // Step 7: Validate the success message
    const successMessage = await formPage.getSuccessMessage();
    expect(successMessage).toBe('Thanks for contacting us, we will get back to you shortly.');
  });
});