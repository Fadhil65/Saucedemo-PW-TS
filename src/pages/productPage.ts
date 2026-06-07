import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {

    readonly sortDropdown: Locator;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
      super(page);

      this.sortDropdown = page.locator('[data-test="product-sort-container"]');
      this.inventoryItems = page.locator('[data-test="inventory-item"]');
      this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
      this.cartLink = page.locator('[data-test="shopping-cart-link"]');
      this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
      this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    }

    async sortBy(option: string) {
      await this.sortDropdown.selectOption(option);
    }

    async getItemNames(): Promise<string[]> {
      return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    async getItemPrices(): Promise<number[]> {
      const texts = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
      return texts.map((t) => parseFloat(t.replace('$', '')));
    }

    async addToCartByIndex(index: number) {
      await this.page.locator('button[data-test^="add-to-cart"]').nth(index).click();
    }

    async removeFromCartByIndex(index: number) {
      await this.page.locator('button[data-test^="remove"]').nth(index).click();
    }

    async goToCart() {
      await this.cartLink.click();
    }

    async logout() {
      await this.burgerMenuButton.click();
      await this.logoutLink.click();
    }
  }