import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

const validUsername = 'tomsmith';
const validPassword = 'SuperSecretPassword!';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }): Promise<void> => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }): Promise<void> => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(validUsername, validPassword);

    await expect(loginPage.successMessage).toContainText('You logged into a secure area!');
    await expect(dashboardPage.logoutButton).toBeVisible();
  });

  test('should show error for invalid username', async (): Promise<void> => {
    await loginPage.login('invalid-user', validPassword);

    await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
  });

  test('should show error for invalid password', async (): Promise<void> => {
    await loginPage.login(validUsername, 'invalid-password');

    await expect(loginPage.errorMessage).toContainText('Your password is invalid!');
  });

  test('should show error for empty credentials', async (): Promise<void> => {
    await loginPage.clickSubmit();

    await expect(loginPage.errorMessage).toContainText('Your username is invalid!');
  });

  test('should display correct page title', async ({ page }): Promise<void> => {
    await expect(page).toHaveTitle('The Internet');
  });

  test('should redirect to dashboard on successful login', async ({ page }): Promise<void> => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(validUsername, validPassword);

    await expect(page).toHaveURL(/\/secure$/);
    await expect(dashboardPage.welcomeMessage).toContainText('Welcome to the Secure Area');
    expect(await dashboardPage.isLoaded()).toBe(true);
  });
});
