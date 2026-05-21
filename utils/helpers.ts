import { Page } from '@playwright/test';
import { mkdirSync, readFileSync } from 'fs';
import path from 'path';

/**
 * Waits until the page reaches the network idle load state.
 *
 * @param page - Playwright page instance.
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

/**
 * Takes a full-page screenshot and saves it with a timestamped filename.
 *
 * @param page - Playwright page instance.
 * @param name - Screenshot name prefix.
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = `test-results/screenshots/${name}-${timestamp}.png`;

  mkdirSync(path.dirname(screenshotPath), { recursive: true });

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });
}

/**
 * Generates a random test email address.
 *
 * @returns Random email address for test data.
 */
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).slice(2, 10);

  return `test-${timestamp}-${randomValue}@example.com`;
}

/**
 * Reads and parses a JSON file from the data folder.
 *
 * @param filename - JSON filename inside the data folder.
 * @returns Parsed JSON data typed by the caller.
 */
export function readTestData<T>(filename: string): T {
  const filePath = path.resolve(process.cwd(), 'data', filename);
  const fileContent = readFileSync(filePath, 'utf-8');

  return JSON.parse(fileContent) as T;
}
