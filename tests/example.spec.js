const { test, expect } = require('@playwright/test');

test('Simple Form Demo Test', async ({ page }) => {
    // Step 1: Open LambdaTest Selenium Playground
    await page.goto('https://www.lambdatest.com/selenium-playground');

    // Step 2: Click “Simple Form Demo”
    await page.locator('text=Simple Form Demo').click();

    // Step 3: Validate that the URL contains “simple-form-demo”
    await expect(page).toHaveURL(/simple-form-demo/);

    // Step 4: Create a variable for a string value
    const message = "Welcome to LambdaTest";

    // Step 5: Enter value in the “Enter Message” text box
    await page.fill('#user-message', message);

    // Step 6: Click “Get Checked Value”
    await page.click('#showInput');

    // Step 7: Validate whether the same text message is displayed
    const displayedMessage = await page.locator('#message').textContent();
    await expect(displayedMessage).toContain(message);
});

test('Drag & Drop Sliders Test', async ({ page }) => {
  // Step 1: Open LambdaTest Selenium Playground
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // Step 2: Click “Drag & Drop Sliders”
  await page.locator('text=Drag & Drop Sliders').click();

  // Step 3: Select the slider “Default value 15”
  const slider = page.locator("input[value='15']");
  const rangeValue = page.locator("#rangeSuccess");

  // Step 4: Drag the slider to set it to 95
  await slider.focus();
  for (let i = 0; i < 80; i++) { // Increase the loop count if necessary
      await slider.press('ArrowRight');
  }

  // Step 5: Validate whether the range value shows 95
  await expect(rangeValue).toHaveText('95');
});

// test('Input Form Submit Test', async ({ page }) => {
//   // Step 1: Open LambdaTest Selenium Playground
//   await page.goto('https://www.lambdatest.com/selenium-playground');

//   // Step 2: Click “Input Form Submit”
//   await page.locator('text=Input Form Submit').click();

//   // Step 3: Ensure the form is visible before interacting
//   // const form = page.locator('form');
//   // await expect(form).toBeVisible();

//   // Step 4: Click “Submit” without filling in any information
//   await page.waitForTimeout(5000);
//   const submitButton = page.locator('form button[type="submit"]');
//   await submitButton.scrollIntoViewIfNeeded();
//   await submitButton.click();

//   // Step 5: Assert error message “Please fill in the fields”
//   await expect(page.locator('.parsley-errors-list')).toContainText('Please fill in the fields');
//   // Step 6: Fill in Name, Email, and other fields
//   await page.fill('#name', 'John Doe');
//   await page.fill('#inputEmail4', 'john.doe@example.com');
//   await page.fill('#inputPassword4', 'Password123');
//   await page.fill('#company', 'LambdaTest');
//   await page.fill('#websitename', 'https://example.com');
//   await page.selectOption('#inputState', { label: 'United States' });
//   await page.fill('#inputAddress1', '123 Test Street');
//   await page.fill('#inputAddress2', 'Suite 100');
//   await page.fill('#inputCity', 'New York');
//   await page.fill('#inputZip', '10001');

//   // Step 7: Click “Submit”
//   await page.locator('form button[type="submit"]').click();

//   // Step 8: Validate success message
//   await expect(page.locator('.success-msg')).toHaveText('Thanks for contacting us, we will get back to you shortly.');
// });

test('Test Scenario 3 - Input Form Submit', async ({ page }) => {
  // Step 1: Open the Selenium Playground page
  await page.goto('https://www.lambdatest.com/selenium-playground');
  
  // Click “Input Form Submit”
  await page.locator('text=Input Form Submit').click();

  // Step 2: Click “Submit” without filling in any information
  await page.locator('button:has-text("Submit")').click();
  
  // Step 3: Assert “Please fill in the fields” error message
  // await expect(page.locator('div:has-text("Please fill in the fields")')).toBeVisible();
  // await expect(page.locator('.parsley-errors-list')).toContainText('Please fill in the fields');
  const errorMessage = await page.textContent('text=Please fill out this field.'); // Using text selector
  expect(errorMessage).toBe('Please fill out this field.');
  
  // Step 4: Fill in Name, Email, and other fields
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'johndoe@example.com');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="company"]', 'LambdaTest');
  await page.fill('input[name="website"]', 'https://example.com');
  await page.fill('input[name="address"]', '123 Main St');
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="state"]', 'NY');
  await page.fill('input[name="zip"]', '10001');
  await page.fill('textarea[name="comment"]', 'This is a test message.');
  
  // Step 5: Select “United States” from the Country drop-down
  await page.selectOption('select[name="country"]', { label: 'United States' });
  
  // Step 6: Fill in all fields and click “Submit”
  await page.locator('button:has-text("Submit")').click();
  
  // Step 7: Validate the success message
  await expect(page.locator('div:has-text("Thanks for contacting us, we will get back to you shortly.")')).toBeVisible();
});

