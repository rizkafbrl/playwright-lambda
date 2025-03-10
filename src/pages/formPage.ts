import { BasePage } from './basePage';

export class FormPage extends BasePage {
  async fillForm(inputMessage: string) {
    await this.page.locator('input#user-message').fill(inputMessage);
    await this.page.locator('#showInput').click();
  }

  async getDisplayedMessage() {
    return this.page.locator('#message').textContent();
  }

  async submitForm(formData: { [key: string]: string }) {
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'country') {
        await this.page.locator(`select[name="${key}"]`).selectOption({ label: value as string });
      } else {
        const inputLocator = this.page.locator(`input[name="${key}"]`);
        await inputLocator.waitFor({ state: 'visible', timeout: 5000 });
        await inputLocator.fill(value);
      }
    }
    await this.page.locator('button:has-text("Submit")').click();
  }

  async getErrorMessage() {
    return this.page.locator('div:has-text("Please fill in the fields")').textContent();
  }

  async getSuccessMessage() {
    return this.page.locator('div:has-text("Thanks for contacting us, we will get back to you shortly.")').textContent();
  }
}