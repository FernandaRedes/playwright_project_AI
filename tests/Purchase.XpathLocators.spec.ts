import { test, expect } from '@playwright/test';

test('End-to-End Purchase Flow with the Xpath Locators', async ({ page }) => {
    test.setTimeout(50000);

  await page.goto('https://www.testing101.net/category/all-products');
  await page.waitForTimeout(2000);  

  const buttonSorting = page.locator('xpath=//span[text()="Sorting"]');
  await buttonSorting.click();
  await page.waitForTimeout(5000);

  const buttonAddToCartPLP = page.locator('xpath=//div[@data-slug="americano"]//span[text()="Add to Cart"]');
//   await buttonAddToCartPLP.waitFor();
  await page.waitForTimeout(5000);
  await buttonAddToCartPLP.click();
  
  const iframeMiniCart = page.frameLocator('xpath=//iframe[contains(@class, "U73P_q")]//span[text()="View Cart"]');
  const buttonViewCart = iframeMiniCart.locator('xpath=//footer//span[text()="View Cart"]');
//   await buttonViewCart.waitFor();
  await page.waitForTimeout(5000);
  await buttonViewCart.click();
  
  const assertionEmptyCart = page.locator('xpath=//h3[@data-hook="EmptyState.title"]');
  await expect(assertionEmptyCart).not.toBeVisible();
  
  const buttonCheckout = page.locator('xpath=//span[text()="Checkout"]');
//   await buttonCheckout.waitFor();
  await page.waitForTimeout(5000);
  await buttonCheckout.click();

  const fieldEmail = page.locator('xpath=//input[@aria-label="Email"]');
  await fieldEmail.fill('test1@mailinator.com');
  const fieldFirstName = page.locator('xpath=//input[@aria-label="First name"]');
  await fieldFirstName.fill('First name');
  const fieldLastName = page.locator('xpath=//input[@aria-label="Last name"]');
  await fieldLastName.fill('LastName');

  const dropDownCountryRegion = page.locator('xpath=//div[@data-hook="form-field-country"]');
  await dropDownCountryRegion.click();
  const dropDownOption = page.locator('xpath=//div[text()="Brazil"]');
  await dropDownOption.click();
//   const fieldAddress = page.locator('xpath=//input[@role="combobox" and @aria-expanded="true"]');
  const fieldAddress = page.locator('xpath=//div[@data-hook="form-field-address_line"]//input[@role="combobox"]');
  await fieldAddress.fill('123 Street Example');

  const fieldCity = page.locator('xpath=//input[@aria-label="City"]');
  await fieldCity.fill('Florianólopis');
  const fieldZipCode = page.locator('xpath=//input[@aria-label="Zip / Postal code"]');
  await fieldZipCode.fill('88090000');
  const buttonContinueCheckout1 = page.locator('xpath=//span[text()="Continue"]');
  await buttonContinueCheckout1.click();
  //checkout 2
  const buttonContinueCheckout2 = page.locator('xpath=//span[text()="Continue"]');
  await buttonContinueCheckout2.click();
//   checkout 3
  const buttonPlaceOrder = page.locator('xpath=//span[text()="Place Order & Pay');
  await buttonPlaceOrder.waitFor();
  await buttonPlaceOrder.click();
  await page.waitForTimeout(5000);
  await page.pause();

  //Assertion
  await expect(page.getByText("You'll receive a confirmation email soon.")).toBeVisible({ timeout: 5000 }).catch(() => {
    throw new Error(" Purchase confirmation message was not displayed.");
  });

});


