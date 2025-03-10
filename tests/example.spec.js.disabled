const { test, expect } = require('@playwright/test');

test('TC_001: Validate Simple Form Submission', async ({ page }) => {
  const playgroundURL = 'https://www.lambdatest.com/selenium-playground';
  const simpleFormLink = page.locator('text=Simple Form Demo');
  const messageInput = page.locator('input#user-message');
  const showMessageButton = page.locator('#showInput');
  const displayedMessage = page.locator('#message');

  await page.goto(playgroundURL);
  await simpleFormLink.waitFor({ state: 'visible', timeout: 5000 });
  await simpleFormLink.click();

  await expect(page).toHaveURL(/simple-form-demo/);

  const inputMessage = "Welcome to LambdaTest";
  await messageInput.waitFor({ state: 'visible', timeout: 5000 });
  await messageInput.fill(inputMessage);

  await showMessageButton.waitFor({ state: 'visible', timeout: 5000 });
  await showMessageButton.click();

  await displayedMessage.waitFor({ state: 'visible', timeout: 7000 });
  await expect(displayedMessage).toHaveText(inputMessage);
});


test('TC_002: Adjust and Validate Slider Value', async ({ page }) => {
    const playgroundURL = 'https://www.lambdatest.com/selenium-playground';
    const dragDropSlidersLink = page.locator('text=Drag & Drop Sliders');
    const slider = page.locator("input[value='15']");
    const sliderValueDisplay = page.locator("#rangeSuccess");
    
    await page.goto(playgroundURL);
    await dragDropSlidersLink.click();
    
    await slider.focus();
    for (let i = 0; i < 80; i++) {
        await slider.press('ArrowRight');
        await page.waitForTimeout(50);
    }
    
    await expect(sliderValueDisplay).toHaveText('95');
});

test('TC_003: Submit Input Form and Validate Error Messages', async ({ page }) => {
  const playgroundURL = 'https://www.lambdatest.com/selenium-playground';
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

  const inputFormSubmitLink = page.locator('text=Input Form Submit');
  const submitButton = page.locator('button:has-text("Submit")');
  const successMessage = page.locator('div:has-text("Thanks for contacting us")');
  const nameFieldError = page.locator('input[name="name"] + ul.parsley-errors-list li');

  const fields = {
      name: page.locator('input[name="name"]'),
      email: page.locator('input#inputEmail4'),
      phone: page.locator('input[name="phone"]'),
      company: page.locator('input[name="company"]'),
      website: page.locator('input[name="website"]'),
      address: page.locator('input[name="address"]'),
      city: page.locator('input[name="city"]'),
      state: page.locator('input[name="state"]'),
      zip: page.locator('input[name="zip"]'),
      comment: page.locator('textarea[name="comment"]'),
      country: page.locator('select[name="country"]')
  };

  await page.goto(playgroundURL);
  await inputFormSubmitLink.click();
  await page.setViewportSize({ width: 1920, height: 1080 });

  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click();

  await expect(nameFieldError).toBeVisible({ timeout: 5000 });
  await expect(nameFieldError).toHaveText("Please fill in this field.");

  for (const [key, value] of Object.entries(formData)) {
      if (key === 'country') {
          await fields[key].selectOption({ label: value });
      } else {
          await fields[key].fill(value);
      }
  }

  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click();

  await expect(successMessage).toBeVisible();
  await expect(successMessage).toHaveText('Thanks for contacting us');
});