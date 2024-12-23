import { test, expect } from '@playwright/test';

test('Add a new Adress in My Account', async ({ page }) => {
  
  await page.goto('https://testing101.net');
  await page.waitForTimeout(2000);
  
  const title = await page.title();
  expect(title).toBe('Testing 101 | Software Testing 101');

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByTestId('signUp.switchToSignUp').click();
  await page.getByLabel('Email').fill('teste_fe@mailinator.com');
  await page.getByLabel('Password').fill('Teste123!');
  await page.getByTestId('buttonElement').click();

//   const accountMenu = await page.getByLabel('teste_fe'); 
//   await expect(accountMenu).toBeVisible();

  await expect(page.getByLabel('teste_fe account menu')).toBeVisible();
  await page.getByLabel('teste_fe account menu').click();
  await page.getByRole('link', { name: 'My Address'}).click();
  await page.frameLocator('iframe[title="My Addresses"]').getByRole('button', { name: 'Add New Address' }).click();
  
  //Interacting with iframe requires using xpath
  const frame = await page.frameLocator('xpath=/html/body/div[1]/div/div[5]/iframe');
  await frame.getByLabel('First Name').fill('FirstName');
  await frame.getByLabel('Last Name').fill('LastName');
  await frame.getByLabel('Company Name').fill('CompanyName');
  await frame.getByLabel('CPF/CNPJ').fill('90188798000130');
  await frame.getByLabel('Phone').fill('11999977001');
  await frame.getByLabel('Street name').fill('Street ABC');
  await frame.getByLabel('House number').fill('123');
  await frame.getByLabel('Address - line 2').fill('home');
  await frame.getByLabel('City').fill('Florianópolis');
  await frame.getByRole('img').nth(1).click();
  await page.waitForTimeout(3000);
  await frame.getByText('Santa Catarina').click();
  await frame.getByLabel('Zip / Postal code').fill('88051000');
  await frame.getByLabel('Add Address and close dialog').click();
  await page.frameLocator('iframe[title="My Address"]');

  //Assertion
  const addressLocator = page.frameLocator('iframe[title="My Address"]')
    .locator('address[data-hook="formatted-address"]');

  await expect(addressLocator).toHaveText(`
    FirstName LastName
    CompanyName
    Street ABC 123, home
    Florianópolis, Santa Catarina 88051000 
    Brazil
    11999977001
  `);
});


