import { Page, Locator } from '@playwright/test';

export default class DropdownPage {
  readonly dropdownSelect: Locator;

  constructor(private page: Page) {
    this.dropdownSelect = this.page.locator('#dropdown');
  }

  /**
   * Navigates to the dropdown page.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/dropdown');
  }

  /**
   * Selects a dropdown option by value.
   *
   * @param value - Option value to select.
   */
  async selectOption(value: string): Promise<void> {
    await this.dropdownSelect.selectOption(value);
  }

  /**
   * Gets the selected dropdown value.
   *
   * @returns The selected option value.
   */
  async getSelectedValue(): Promise<string> {
    return this.dropdownSelect.inputValue();
  }
}
