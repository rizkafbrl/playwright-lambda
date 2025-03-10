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

    const formData = {
      name: 'John Doe',
      email: 'rizkafbrl@gmail.com',
      phone: '1234567890',
      company: 'LambdaTest',
      website: 'https://example.com',
      address: 'Apt. Puri Park View',
      city: 'Jakarta',
      state: 'JKT',
      zip: '10001',
      comment: 'This is a test message.',
      country: 'Indonesia'
    };

    await formPage.submitForm(formData);

    const successMessage = await formPage.getSuccessMessage();
    expect(successMessage).toBe('Thanks for contacting us');
  });
});