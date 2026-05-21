import { test, expect } from '@playwright/test';
import DropdownPage from '../pages/DropdownPage';

test.describe('Dropdown Page Tests', () => {
  let dropdownPage: DropdownPage;

  test.beforeEach(async ({ page }): Promise<void> => {
    dropdownPage = new DropdownPage(page);
    await dropdownPage.navigate();
  });

  test('should show dropdown', async (): Promise<void> => {
    await expect(dropdownPage.dropdownSelect).toBeVisible();
  });

  test("should select 'Option 1' and verify", async (): Promise<void> => {
    await dropdownPage.selectOption('1');

    expect(await dropdownPage.getSelectedValue()).toBe('1');
  });

  test("should select 'Option 2' and verify", async (): Promise<void> => {
    await dropdownPage.selectOption('2');

    expect(await dropdownPage.getSelectedValue()).toBe('2');
  });
});
