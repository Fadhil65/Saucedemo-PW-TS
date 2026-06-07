import {type Page, type Locator} from '@playwright/test';
import {BasePage} from './basePage';

export class CartPage extends BasePage {

    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
      super(page);
      this.cartItems = page.locator('[data-test="inventory-item"]');
      this.checkoutButton = page.locator('[data-test="checkout"]');
      this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async getItemNames(): Promise<string[]> {
      return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    }

    async removeByIndex(index: number) {
      await this.page.locator('button[data-test^="remove"]').nth(index).click();
    }

    async checkout() {
      await this.checkoutButton.click();
    }

    async continueShopping() {
      await this.continueShoppingButton.click();
    }
  }