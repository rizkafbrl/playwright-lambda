import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/formPage';
import { getBrowser } from '../helpers/lambdaTestHelper';

test.describe('Form Tests', () => {
  test('TC_001: Validate Simple Form Submission', async () => {
    const browser = await getBrowser('TC_001: Validate Simple Form Submission');
    const page = await browser.newPage();
    const formPage = new FormPage(page);
    await formPage.navigateTo('https://www.lambdatest.com/selenium-playground');
    await page.locator('text=Simple Form Demo').click();

    const inputMessage = "Welcome to LambdaTest";
    await formPage.fillForm(inputMessage);

    const displayedMessage = await formPage.getDisplayedMessage();
    expect(displayedMessage).toBe(inputMessage);

    await browser.close();
  });

  test('TC_003: Submit Input Form and Validate Error Messages', async () => {
    const browser = await getBrowser('TC_003: Submit Input Form and Validate Error Messages');
    const page = await browser.newPage();
    const formPage = new FormPage(page);
    await formPage.navigateTo('https://www.lambdatest.com/selenium-playground');
    await page.locator('text=Input Form Submit').click();

    await formPage.ensureElementVisible('button:has-text("Submit")');
    await page.locator('button:has-text("Submit")').click();

    const errorMessage = await formPage.getErrorMessage();
    if (errorMessage) {
      expect(errorMessage).toBe('Please fill in the fields');
    }

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
      country: 'United States'
    };

    await formPage.submitForm(formData);

    const successMessage = await formPage.getSuccessMessage();
    expect(successMessage).toBe('Thanks for contacting us, we will get back to you shortly.');

    await browser.close();
  });
});