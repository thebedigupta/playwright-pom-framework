import { test, expect } from '@playwright/test';
import CheckboxPage from '../pages/CheckboxPage';

test.describe('Checkbox Page Tests', () => {
  let checkboxPage: CheckboxPage;

  test.beforeEach(async ({ page }): Promise<void> => {
    checkboxPage = new CheckboxPage(page);
    await checkboxPage.navigate();
  });

  test('should show both checkboxes', async (): Promise<void> => {
    await expect(checkboxPage.firstCheckbox).toBeVisible();
    await expect(checkboxPage.secondCheckbox).toBeVisible();
  });

  test('should toggle first checkbox and verify state changed', async (): Promise<void> => {
    const initialState = await checkboxPage.isChecked(1);

    await checkboxPage.toggleCheckbox(1);

    expect(await checkboxPage.isChecked(1)).toBe(!initialState);
  });

  test('should toggle second checkbox and verify state changed', async (): Promise<void> => {
    const initialState = await checkboxPage.isChecked(2);

    await checkboxPage.toggleCheckbox(2);

    expect(await checkboxPage.isChecked(2)).toBe(!initialState);
  });
});
