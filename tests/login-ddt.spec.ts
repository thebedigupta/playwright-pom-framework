import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import testDataJson from '../data/testData.json';
import { LoginTestData, TestDataFile } from '../types/TestData';

const testData: TestDataFile = testDataJson;

test.describe('Login Data-Driven Tests', () => {
  for (const user of testData.validUsers) {
    test(`should login successfully for valid user: ${user.username}`, async ({ page }): Promise<void> => {
      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login(user.username, user.password);

      await expect(loginPage.successMessage).toContainText(user.expectedMessage);
    });
  }

  for (const user of testData.invalidUsers) {
    const testName = user.username === '' && user.password === ''
      ? 'empty credentials'
      : `invalid user: ${user.username}`;

    test(`should show correct error for ${testName}`, async ({ page }): Promise<void> => {
      const loginPage = new LoginPage(page);
      const loginData: LoginTestData = user;

      await loginPage.navigate();
      await loginPage.login(loginData.username, loginData.password);

      await expect(loginPage.errorMessage).toContainText(loginData.expectedMessage);
    });
  }
});
