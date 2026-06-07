import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {

    readonly sortDropdown: Locator;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;
    readonly btnAddToCartBackpack: Locator;
    readonly btnAddToCartBikeLight: Locator;
    readonly btnAddToCartBoltTShirt: Locator;
    readonly btnAddToCartFleeceJacket: Locator;
    readonly btnRemoveBackpack: Locator;
    readonly btnRemoveBikeLight: Locator;
    readonly btnRemoveBoltTShirt: Locator;
    readonly btnRemoveFleeceJacket: Locator;

    

    constructor(page: Page) {
      super(page);

      this.sortDropdown = page.locator('[data-test="product-sort-container"]');
      this.inventoryItems = page.locator('[data-test="inventory-item"]');
      this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
      this.cartLink = page.locator('[data-test="shopping-cart-link"]');
      this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
      this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
      this.btnAddToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
      this.btnAddToCartBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
      this.btnAddToCartBoltTShirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
      this.btnAddToCartFleeceJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
      this.btnRemoveBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
      this.btnRemoveBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');
      this.btnRemoveBoltTShirt = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
      this.btnRemoveFleeceJacket = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
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
  
    async addToCartBackpack() {
      await this.btnAddToCartBackpack.click();
    }

    async addToCartBikeLight() {
      await this.btnAddToCartBikeLight.click();
    }

    async removeBackpack() {
      await this.btnRemoveBackpack.click();
    }

    async goToCart() {
      await this.cartLink.click();
    }

    async logout() {
      await this.burgerMenuButton.click();
      await this.logoutLink.click();
    }
  }