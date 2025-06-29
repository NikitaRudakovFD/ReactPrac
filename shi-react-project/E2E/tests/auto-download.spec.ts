import { test, expect } from '@playwright/test';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Пользователь создает и скачивает CSV файл', async ({ page }) => {
  // 1. Переход на страницу с проверкой
  const response = await page.goto('/generator', { timeout: 60000 });
  if (!response || !response.ok()) {
    throw new Error(`Failed to load page: ${response?.status()}`);
  }

  // 2. Ожидание появления кнопки
  const generateBtn = page.getByTestId('buttonWithText');
  await expect(generateBtn).toBeVisible({ timeout: 15000 });

  // 3. Загрузка файла
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    generateBtn.click(),
  ]);

  // 4. Проверка файла
  const suggestedFilename = download.suggestedFilename();
  expect(suggestedFilename).toBe('report.csv');

  // 5. Сохранение файла
  const downloadPath = path.join(__dirname, '../downloads', suggestedFilename);
  await download.saveAs(downloadPath);
});
