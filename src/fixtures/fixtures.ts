import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import {CREDENTIALS} from '../config/env.config';

type PageFixtures = {
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    authenticatedPage: ProductPage;
  };

  export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();       
      await use(loginPage);        
    },

    productPage: async ({ page }, use) => {
      await use(new ProductPage(page));
    },

    cartPage: async ({ page }, use) => {
      await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
      await use(new CheckoutPage(page));
    },

    // Fixture ini SUDAH LOGIN sebelum test jalan
    authenticatedPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
      const productPage = new ProductPage(page);
      await productPage.title.waitFor();
      await use(productPage);   
    },
  });

  export { expect } from '@playwright/test';
