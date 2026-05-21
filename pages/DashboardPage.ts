import { Page, Locator } from '@playwright/test';

export default class DashboardPage {
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;

  constructor(private page: Page) {
    this.welcomeMessage = this.page.locator('h4.subheader');
    this.logoutButton = this.page.locator('a.button[href="/logout"]');
  }

  /**
   * Gets the dashboard welcome message.
   *
   * @returns The trimmed welcome message text.
   */
  async getWelcomeMessage(): Promise<string> {
    return (await this.welcomeMessage.textContent())?.trim() ?? '';
  }

  /**
   * Checks whether the dashboard page is loaded.
   *
   * @returns True when the welcome message and logout button are visible.
   */
  async isLoaded(): Promise<boolean> {
    return (await this.welcomeMessage.isVisible()) && (await this.logoutButton.isVisible());
  }

  /**
   * Logs out from the dashboard page.
   */
  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
