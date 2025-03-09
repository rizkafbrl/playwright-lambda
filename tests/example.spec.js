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
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.locator('text=Input Form Submit').click();

  // Ubah ukuran jendela browser
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Scroll ke elemen input "Name" sebelum validasi
  await page.locator('input[name="name"]').scrollIntoViewIfNeeded();

  const submitButton = page.locator('button:has-text("Submit")');

  // Scroll to the Submit button before clicking
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click();

  // Wait for the specific error message next to the Name input
  const nameInputError = page.locator('input#name + ul.parsley-errors-list li');

  try {
    // Wait for the error message to be visible
    await expect(nameInputError).toBeVisible({ timeout: 10000 });

    // Wait for the error message to be attached to the DOM
    await page.waitForSelector('input#name + ul.parsley-errors-list li', { timeout: 5000 });

    // Scroll the error message into view
    try {
      await nameInputError.scrollIntoViewIfNeeded();
    } catch (error) {
      console.error("Error during scrollIntoViewIfNeeded:", error);
      // Handle the error, maybe retry or log it
    }

    // Verify the error message text
    await expect(nameInputError).toHaveText("Please fill in this field.");

    // Verifikasi posisi tooltip
    const tooltipBoundingBox = await nameInputError.boundingBox();
    console.log(tooltipBoundingBox);

  } catch (e) {
    console.log('Error message for Name input not found. Checking alternative selectors...');
    console.log(await page.locator('body').innerHTML()); // Debugging
  }

  // Fill out the form
  await page.fill('input[name="name"]', 'John Doe');

  // Wait for the email field to be visible and enabled
  const emailInput = page.locator('input#inputEmail4');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill('johndoe@example.com');

  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('input[name="company"]', 'LambdaTest');
  await page.fill('input[name="website"]', 'https://example.com');
  await page.fill('input[name="address"]', '123 Main St');
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="state"]', 'NY');
  await page.fill('input[name="zip"]', '10001');
  await page.fill('textarea[name="comment"]', 'This is a test message.');

  await page.selectOption('select[name="country"]', { label: 'United States' });

  // Scroll to Submit button before clicking again
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click();

  // Verify success message
  const successMessage = page.locator('div:has-text("Thanks for contacting us")');
  await expect(successMessage).toBeVisible();
});