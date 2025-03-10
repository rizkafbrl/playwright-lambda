import { BasePage } from './basePage';
import { sliderPageLocators } from '../../locators/sliderPageLocators.ts';

export class SliderPage extends BasePage {
  async adjustSlider(targetValue: number) {
    const slider = this.page.locator(sliderPageLocators.sliderInput);
    await slider.focus();
    for (let i = 0; i < 80; i++) {
      await slider.press('ArrowRight');
      await this.page.waitForTimeout(50);
    }
  }

  async getSliderValue() {
    return this.page.locator(sliderPageLocators.sliderValueDisplay).textContent();
  }
}