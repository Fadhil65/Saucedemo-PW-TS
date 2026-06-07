 import { test, expect } from '../../src/fixtures/fixtures';

  test.describe('Cart', () => {
    test('TC-013: Add single item shows badge',{ tag: [ '@regression','@cart','@positive','@smoke'] },
         async ({ authenticatedPage, page }) => {
      await authenticatedPage.addToCartByIndex(0);
      await expect(authenticatedPage.cartBadge).toHaveText('1');
    });

    test('TC-014: Add multiple items', { tag: [ '@regression','@cart','@positive'] }, 
        async ({ authenticatedPage }) => {
      await authenticatedPage.addToCartByIndex(0);
      await authenticatedPage.addToCartByIndex(1);
      await expect(authenticatedPage.cartBadge).toHaveText('2');
    });

    test('TC-015: Remove item hides badge', { tag: [ '@regression','@cart','@positive','@smoke'] }, 
        async ({ authenticatedPage }) => {
      await authenticatedPage.addToCartByIndex(0);
      await authenticatedPage.removeFromCartByIndex(0);
      await expect(authenticatedPage.cartBadge).not.toBeVisible();
    });

    test('TC-016: Cart page shows correct items', { tag: [ '@regression','@cart','@positive'] }, 
        async ({ authenticatedPage, cartPage }) => {
      const allNames = await authenticatedPage.getItemNames();
      await authenticatedPage.addToCartByIndex(0);
      await authenticatedPage.goToCart();

      const cartNames = await cartPage.getItemNames();
      expect(cartNames).toContain(allNames[0]);
    });

    test('TC-017: Remove item from cart page',{ tag: [ '@regression','@cart','@positive','@smoke'] }, 
        async ({ authenticatedPage, cartPage }) => {
      await authenticatedPage.addToCartByIndex(0);
      await authenticatedPage.goToCart();
      await expect(authenticatedPage.title).toHaveText('Your Cart');
      await cartPage.removeByIndex(0);
      await expect(cartPage.cartItems).toHaveCount(0);
    });

    test('TC-018: Continue shopping goes back', { tag: [ '@regression','@cart','@positive'] }, 
        async ({ authenticatedPage, cartPage, page }) => {
      await authenticatedPage.goToCart();
      await cartPage.continueShopping();
      await expect(page).toHaveURL(/inventory/);
    });
  });