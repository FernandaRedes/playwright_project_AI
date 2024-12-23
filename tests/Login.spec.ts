import { test, expect } from '@playwright/test';

test('Login with the valid credentials', async ({ page }) => {
  
  await page.goto('https://testing101.net');
  await page.waitForTimeout(5000);
  
  const title = await page.title();
  expect(title).toBe('Testing 101 | Software Testing 101');

//   await page.getByLabel('Consent', { exact: true }).click();
// or 
// const buttonConsent = page.locator("xpath=//button[@aria-label='Consent']");
// await buttonConsent.click();

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByTestId('signUp.switchToSignUp').click();
  await page.getByLabel('Email').fill('teste_fe@mailinator.com');
  await page.getByLabel('Password').fill('Teste123!');
  await page.getByTestId('buttonElement').click();
  await page.waitForTimeout(5000);

// Assert that the account menu is visible after login 
  const accountMenu = await page.getByLabel('teste_fe'); 
  await expect(accountMenu).toBeVisible();

//   await page.pause()

});

test('Login with the empty fields of the Login form', async ({ page }) => {
  
    await page.goto('https://testing101.net');
    
    const title = await page.title();
    expect(title).toBe('Testing 101 | Software Testing 101');
  
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByTestId('signUp.switchToSignUp').click();
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();

  });

  test('Login with empty Email field of the Login form', async ({ page }) => {
  
  await page.goto('https://testing101.net');
  await page.waitForTimeout(2000);
  
  const title = await page.title();
  expect(title).toBe('Testing 101 | Software Testing 101');

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByTestId('signUp.switchToSignUp').click();
  await page.getByLabel('Password').fill('Teste123!');
  await page.getByTestId('buttonElement').click();
  await page.waitForTimeout(2000);

  await expect(page.getByText('Email cannot be blank')).toBeVisible();
    
});


test('Login with empty Password field of the Login form', async ({ page }) => {
  
    await page.goto('https://testing101.net');
    await page.waitForTimeout(2000);
    
    const title = await page.title();
    expect(title).toBe('Testing 101 | Software Testing 101');
  
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByTestId('signUp.switchToSignUp').click();
    await page.getByLabel('Email').fill('teste_fe@mailinator.com');
    await page.getByTestId('buttonElement').click();
    await page.waitForTimeout(2000);
  
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
      
  });

  test('Login with the invalid credentials', async ({ page }) => {
  
    await page.goto('https://testing101.net');
    await page.waitForTimeout(2000);
    
    const title = await page.title();
    expect(title).toBe('Testing 101 | Software Testing 101');

    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByTestId('signUp.switchToSignUp').click();
    await page.getByLabel('Email').fill('teste_fe1@mailinator.com');
    await page.getByLabel('Password').fill('Teste123!');
    await page.getByTestId('buttonElement').click();
    await page.waitForTimeout(2000);
    await expect(page.getByText("This email doesn't match any account. Try again.")).toBeVisible();
  
  });

  test('Log in with the invalid password', async ({ page }) => {
  
    await page.goto('https://testing101.net');
    await page.waitForTimeout(2000);
    
    const title = await page.title();
    expect(title).toBe('Testing 101 | Software Testing 101');

    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByTestId('signUp.switchToSignUp').click();
    await page.getByLabel('Email').fill('teste_fe@mailinator.com');
    await page.getByLabel('Password').fill('WrongPass');
    await page.getByTestId('buttonElement').click();
    await page.waitForTimeout(2000);
    await expect(page.getByText("Wrong email or password")).toBeVisible();
  
  });

  test('Log in with a non existent user email', async ({ page }) => {
  
  await page.goto('https://testing101.net');
  await page.waitForTimeout(2000);
  
  const title = await page.title();
  expect(title).toBe('Testing 101 | Software Testing 101');

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByTestId('signUp.switchToSignUp').click();
  await page.getByLabel('Email').fill('t@m.com');
  await page.getByLabel('Password').fill('Teste123!');
  await page.getByTestId('buttonElement').click();
  await page.waitForTimeout(2000);
  await expect(page.getByText("This email doesn't match any account. Try again.")).toBeVisible();
  
});