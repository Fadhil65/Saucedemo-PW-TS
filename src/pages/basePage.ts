import { Locator, type Page } from '@playwright/test';

  export abstract class BasePage {
    readonly title: Locator;

    
    constructor(protected readonly page: Page) {
      this.title = page.locator('[data-test="title"]');
    }

    async waitForPageLoad() {
      await this.page.waitForLoadState('domcontentloaded');
    }
  }