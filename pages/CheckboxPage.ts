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
    await this.page.goto('/checkboxes');
  }

  /**
   * Checks whether a checkbox is selected.
   *
   * @param index - One-based checkbox index.
   * @returns True when the checkbox is checked.
   */
  async isChecked(index: number): Promise<boolean> {
    return this.checkboxes.nth(index - 1).isChecked();
  }

  /**
   * Toggles a checkbox by index.
   *
   * @param index - One-based checkbox index.
   */
  async toggleCheckbox(index: number): Promise<void> {
    await this.checkboxes.nth(index - 1).click();
  }
}
