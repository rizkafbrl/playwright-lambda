import { test, expect } from '@playwright/test';
import { SliderPage } from '../pages/sliderPage';
import { getBrowser } from '../helpers/lambdaTestHelper';

const runOnLambda = false; // or set it to false based on your requirement

test.describe('Slider Tests', () => {
  test('TC_002: Adjust and Validate Slider Value', async () => {
    const browser = await getBrowser('TC_002: Adjust and Validate Slider Value', runOnLambda);
    const page = await browser.newPage();
    const sliderPage = new SliderPage(page);
    await sliderPage.navigateTo('https://www.lambdatest.com/selenium-playground');
    await page.locator('text=Drag & Drop Sliders').click();

    await sliderPage.adjustSlider(99);

    const sliderValue = await sliderPage.getSliderValue();
    expect(sliderValue).toBe('95');

    await browser.close();
  });
});