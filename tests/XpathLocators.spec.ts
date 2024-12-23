import { test, expect } from '@playwright/test';

test('Xpath Playwright Locators', async ({ page }) => {
  
  await page.goto('https://www.testing101.net/playwrightlocators');
  await page.waitForTimeout(5000);
  
  const title = await page.title();
  expect(title).toBe('Playwright | Locators | Software Testing 101');

  //Xpath Locators
  await page.locator('xpath=//select').click();
  await page.locator('xpath=//button[@data-testid="buttonElement"]').click();
  await page.locator('xpath=//span[text()="Submit"]').click();
  await page.locator('xpath=//*[text()="Submit"]').click();
  await page.locator('xpath=//*[@data-testid="buttonElement"]').click();
  //combobox para selecionar a opção da lista
  await page.locator('xpath=//select').click();
  await page.locator('xpath=//*[text()="Personal" and @class="P6sHUt"]').click();
  
  await page.locator('xpath=//*[id="input_comp-llcdvbb8" or @name="first-name"]').click();
  await page.locator('xpath=//*[contains(text(), "terms")]').click();
  await page.locator('xpath=//*[contains(@class, "T6F83Z")]').click();
  await page.locator('xpath=//button//span[text() = "Submit"]').click();

  await page.pause()

});