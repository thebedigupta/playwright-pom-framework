import { Page, Locator } from '@playwright/test';

export default class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(private page: Page) {
    this.usernameInput = this.page.locator('#username');
    this.passwordInput = this.page.locator('#password');
    this.submitButton = this.page.locator('button[type="submit"]');
    this.errorMessage = this.page.locator('#flash.error');
    this.successMessage = this.page.locator('#flash.success');
  }

  /**
   * Navigates to the login page.
   */
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * Enters a username into the username input.
   *
   * @param username - Username to enter.
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Enters a password into the password input.
   *
   * @param password - Password to enter.
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the submit button.
   */
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Gets the displayed login error message.
   *
   * @returns The trimmed error message text.
   */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  /**
   * Logs in with the supplied username and password.
   *
   * @param username - Username to enter.
   * @param password - Password to enter.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSubmit();
  }
}
