import { BasePage } from './basePage';

export class SliderPage extends BasePage {
  async adjustSlider(targetValue: number) {
    const slider = this.page.locator("input[value='15']");
    await slider.focus();
    for (let i = 0; i < 80; i++) {
      await slider.press('ArrowRight');
      await this.page.waitForTimeout(50);
    }
  }

  async getSliderValue() {
    return this.page.locator("#rangeSuccess").textContent();
  }
}