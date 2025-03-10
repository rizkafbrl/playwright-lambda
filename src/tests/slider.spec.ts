import { test, expect } from '@playwright/test';
import { SliderPage } from '../pages/sliderPage';

test.describe('Slider Tests', () => {
  test('TC_002: Adjust and Validate Slider Value', async ({ page }) => {
    const sliderPage = new SliderPage(page);
    await sliderPage.navigateTo('https://www.lambdatest.com/selenium-playground');
    await page.locator('text=Drag & Drop Sliders').click();

    await sliderPage.adjustSlider(96);

    const sliderValue = await sliderPage.getSliderValue();
    expect(sliderValue).toBe('95');
  });
});