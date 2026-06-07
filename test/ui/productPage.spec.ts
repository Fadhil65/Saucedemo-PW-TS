import { test, expect } from '../../src/fixtures/fixtures';
import { SortOption } from '../../src/data/test-data';

  test.describe('Inventory & Sorting',{ tag: [ '@regression','@inventory','@positive'] }, () => {
    test('TC-007: Display all inventory items', async ({ authenticatedPage }) => {
      await expect(authenticatedPage.title).toHaveText('Products');
      await expect(authenticatedPage.inventoryItems).toHaveCount(6);
    });

    test('TC-008: Each item has name and price', async ({ authenticatedPage }) => {
      const names = await authenticatedPage.getItemNames();
      const prices = await authenticatedPage.getItemPrices();

      expect(names).toHaveLength(6);
      prices.forEach((price) => expect(price).toBeGreaterThan(0));
    });

    test('TC-009: Sort by name A to Z', async ({ authenticatedPage }) => {
      await authenticatedPage.sortBy(SortOption.NAME_ASC);
      const names = await authenticatedPage.getItemNames();
      expect(names).toEqual([...names].sort());
    });

    test('TC-010: Sort by name Z to A', async ({ authenticatedPage }) => {
      await authenticatedPage.sortBy(SortOption.NAME_DESC);
      const names = await authenticatedPage.getItemNames();
      expect(names).toEqual([...names].sort().reverse());
    });

    test('TC-011: Sort by price low to high', async ({ authenticatedPage }) => {
      await authenticatedPage.sortBy(SortOption.PRICE_LOW_HIGH);
      const prices = await authenticatedPage.getItemPrices();
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    test('TC-012: Sort by price high to low', async ({ authenticatedPage }) => {
      await authenticatedPage.sortBy(SortOption.PRICE_HIGH_LOW);
      const prices = await authenticatedPage.getItemPrices();
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });
  });