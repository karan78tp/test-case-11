import { test, expect } from '@playwright/test';

test('Invalid Login Validations', async ({ page }) => {
 // Base URL from environment variables
 const baseUrl = process.env.BASE_URL || 'https://ytest.ai';
 
 // Test Data
 const invalidEmail = 'not.a.real.user@invalid-domain.com';
 const validPassword = process.env.VALID_PASSWORD || 'Password123!';
 const validEmail = 'test@example.com';
 const invalidPassword = process.env.INVALID_PASSWORD || 'WrongPassword123!';

 // Navigate to the application
 await page.goto(baseUrl);

 // Step 1: Verify that the text 'Effortless Testing' is visible on the page.
 await expect(page.locator('text=Effortless Testing')).toBeVisible();

 // Step 2: Click on the 'Login' button.
 await page.getByRole('button', { name: 'Login' }).click();

 // Step 3: Click the 'Sign In' button without entering any credentials.
 await page.getByRole('button', { name: 'Sign In' }).click();

 // Step 4: Verify that the error message for empty fields is visible.
 // Note: Adjust the locator based on the actual error message text or class
 await expect(page.locator('.error-message')).toBeVisible(); 

 // Step 5: Enter invalid_email in the email field.
 await page.getByLabel('Email').fill(invalidEmail);

 // Step 6: Enter valid_password in the password field.
 await page.getByLabel('Password').fill(validPassword);

 // Step 7: Click the 'Sign In' button.
 await page.getByRole('button', { name: 'Sign In' }).click();

 // Step 8: Verify that the error message for invalid email is visible.
 await expect(page.locator('.error-message')).toBeVisible();

 // Step 9: Clear the email field and enter valid_email.
 await page.getByLabel('Email').fill('');
 await page.getByLabel('Email').fill(validEmail);

 // Step 10: Clear the password field and enter invalid_password.
 await page.getByLabel('Password').fill('');
 await page.getByLabel('Password').fill(invalidPassword);

 // Step 11: Click the 'Sign In' button.
 await page.getByRole('button', { name: 'Sign In' }).click();

 // Step 12: Verify that the error message for invalid password is visible.
 await expect(page.locator('.error-message')).toBeVisible();
});
