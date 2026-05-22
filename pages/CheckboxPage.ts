import { Page, Locator } from '@playwright/test';

export default class CheckboxPage {
  readonly checkboxes: Locator;
  readonly firstCheckbox: Locator;
  readonly secondCheckbox: Locator;

  constructor(private page: Page) {
    this.checkboxes = this.page.locator('#checkboxes input[type="checkbox"]');
    this.firstCheckbox = this.checkboxes.nth(0);
    this.secondCheckbox = this.checkboxes.nth(1);
  }

  /**
   * Navigates to the checkboxes page.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/checkboxes', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Checks whether a checkbox is selected.
   *
   * @param index - One-based checkbox index.
   * @returns True when the checkbox is checked.
   */
  async isChecked(index: number): Promise<boolean> {
    return this.getCheckboxByIndex(index).isChecked();
  }

  /**
   * Toggles a checkbox by index.
   *
   * @param index - One-based checkbox index.
   */
  async toggleCheckbox(index: number): Promise<void> {
    await this.getCheckboxByIndex(index).click();
  }

  /**
   * Gets the total number of checkboxes on the page.
   *
   * @returns Checkbox count.
   */
  async getCheckboxCount(): Promise<number> {
    return this.checkboxes.count();
  }

  private getCheckboxByIndex(index: number): Locator {
    if (index < 1) {
      throw new Error(`Checkbox index must be one-based. Received: ${index}`);
    }

    return this.checkboxes.nth(index - 1);
  }
}
