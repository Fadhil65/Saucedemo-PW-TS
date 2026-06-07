import { test, expect } from '../../src/fixtures/fixtures';
  import { CheckoutInfo } from '../../src/data/test-data';

  test.describe('Checkout', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
      await authenticatedPage.addToCartByIndex(0);
      await authenticatedPage.goToCart();
    });

    test('TC-019: Complete full checkout (E2E)', { tag: [ '@regression','@checkout','@positive','@smoke'] }, 
        async ({ cartPage, checkoutPage, page }) => {
      await cartPage.checkout();

      const { firstName, lastName, postalCode } = CheckoutInfo.valid;
      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await checkoutPage.submitInfo();

      await expect(page).toHaveURL(/checkout-step-two/);
      await checkoutPage.finish();

      await expect(page).toHaveURL(/checkout-complete/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });

    test('TC-020: Empty first name error', { tag: [ '@regression','@checkout','@negative'] }, 
        async ({ cartPage, checkoutPage }) => {
      await cartPage.checkout();
      await checkoutPage.fillInformation('', 'Doe', '12345');
      await checkoutPage.submitInfo();
      await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    });

    test('TC-021: Empty last name error', { tag: [ '@regression','@checkout','@negative'] }, async ({ cartPage, checkoutPage }) => {
      await cartPage.checkout();
      await checkoutPage.fillInformation('John', '', '12345');
      await checkoutPage.submitInfo();
      await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
    });

    test('TC-022: Empty postal code error',{ tag: [ '@regression','@checkout','@negative'] }, 
        async ({ cartPage, checkoutPage }) => {
      await cartPage.checkout();
      await checkoutPage.fillInformation('John', 'Doe', '');
      await checkoutPage.submitInfo();
      await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
    });

    test('TC-023: Back to products after checkout', { tag: [ '@regression','@checkout','@positive'] }, 
        async ({ cartPage, checkoutPage, page }) => {
      await cartPage.checkout();
      const { firstName, lastName, postalCode } = CheckoutInfo.valid;
      await checkoutPage.fillInformation(firstName, lastName, postalCode);
      await checkoutPage.submitInfo();
      await checkoutPage.finish();
      await checkoutPage.backHomeButton.click();
      await expect(page).toHaveURL(/inventory/);
    });
  });