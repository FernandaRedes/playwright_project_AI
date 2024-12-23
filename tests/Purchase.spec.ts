import { test, expect } from '@playwright/test';

test('End-to-End Purchase Flow for a Single Product', async ({ page }) => {
    test.setTimeout(50000);
  
  await page.goto('https://www.testing101.net/category/all-products');
  await page.waitForTimeout(2000);
  
  const title = await page.title();
  expect(title).toBe('All Products | Software Testing 101');
  await page.click('role=link[name="Sorting"]');
  await page.waitForTimeout(2000);

  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await page.getByLabel('Americano gallery').getByLabel('Add to Cart').click();
  await page.waitForTimeout(5000);
  await page.frameLocator('xpath=/html/body/div[1]/div/div[4]/iframe').getByRole('link', { name: 'View Cart' }).click(); 
  await expect(page.locator('h3[data-hook="EmptyState.title"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(5000);
  await page.getByLabel('Email').fill('teste1@mailinator.com');
  await page.getByLabel('First name').fill('Name');
  await page.getByLabel('Last name').fill('One');
  await page.getByLabel('Phone').fill('48999990899');
  await page.getByLabel('Country/Region*').click();
  await page.getByText('Brazil').click();  
  await page.getByLabel('Street name*').fill('Name Street one');
  await page.getByLabel('House number').fill('10');
  await page.getByLabel('City').fill('Florianópolis');
  await page.getByLabel('State*').click();
  await page.getByText('Santa Catarina').click();
  await page.getByLabel('Zip / Postal code').fill('88050000');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Place Order & Pay' }).click();
  await page.waitForTimeout(5000);

  await expect(page.getByText("You'll receive a confirmation")).toBeVisible({ timeout: 5000 }).catch(() => {
    throw new Error("Purchase confirmation message is not displayed on the webpage.");
  });

});
