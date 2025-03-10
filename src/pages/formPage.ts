import { BasePage } from './basePage';
import { formPageLocators } from '../../locators/formPageLocators';

export class FormPage extends BasePage {
  async fillForm(inputMessage: string) {
    await this.page.locator(formPageLocators.userMessageInput).fill(inputMessage);
    await this.page.locator(formPageLocators.showInputButton).click();
  }

  async getDisplayedMessage() {
    return this.page.locator(formPageLocators.displayedMessage).textContent();
  }

  async ensureElementVisible(locator: string) {
    const element = this.page.locator(locator);
    for (let i = 0; i < 5; i++) {
      try {
        await element.scrollIntoViewIfNeeded();
        await element.waitFor({ state: 'visible', timeout: 1000 });
        break;
      } catch (e) {
        if (i % 2 === 0) {
          await this.page.mouse.wheel(0, 100); // Scroll down
        } else {
          await this.page.mouse.wheel(0, -100); // Scroll up
        }
      }
    }
  }

  async submitForm(formData: { [key: string]: string }) {
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'country') {
        await this.ensureElementVisible(`select[name="${key}"]`);
        await this.page.locator(`select[name="${key}"]`).selectOption({ label: value as string });
      } else {
        const inputLocator = `input[name="${key}"]`;
        await this.ensureElementVisible(inputLocator);
        await this.page.locator(inputLocator).fill(value);
      }
    }
    await this.ensureElementVisible(formPageLocators.submitButton);
    await this.page.locator(formPageLocators.submitButton).click();
  }

  async getErrorMessage() {
    try {
      const errorLocator = this.page.locator(formPageLocators.errorMessage);
      await errorLocator.waitFor({ state: 'visible', timeout: 5000 });
      return errorLocator.textContent();
    } catch (e) {
      return null; // Return null if the error message is not found
    }
  }

  async getSuccessMessage() {
    return this.page.locator(formPageLocators.successMessage).textContent();
  }
}