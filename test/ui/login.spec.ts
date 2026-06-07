import { test, expect } from '../../src/fixtures/fixtures';
import { CREDENTIALS } from '../../src/config/env.config';

test.describe('Authentication', () => {
  test('TC-001: Login with valid credentials',{ tag: [ '@regression','@login','@positive','@smoke'] }, 
    async ({ loginPage, page }) => {

    await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-002: Login with locked out user', { tag: [ '@regression','@login','@negative'] }, 
    async ({ loginPage }) => {

    await loginPage.login(CREDENTIALS.locked.username, CREDENTIALS.locked.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('TC-003: Login with invalid credentials', { tag: [ '@regression','@login','@negative'] }, 
    async ({ loginPage }) => {

    await loginPage.login(CREDENTIALS.invalid.username, CREDENTIALS.invalid.password);
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('TC-004: Login with empty username', { tag: [ '@regression','@login','@negative'] }, 
    async ({ loginPage }) => {

    await loginPage.login('', CREDENTIALS.standard.password);
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('TC-005: Login with empty password',{ tag: [ '@regression','@login','@negative'] }, 
    async ({ loginPage }) => {


    await loginPage.login(CREDENTIALS.standard.username, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  test('TC-006: Logout successfully', { tag: [ '@smoke','@regression','@login','@positive'] }, 
    async ({ authenticatedPage, page }) => {

    await authenticatedPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});