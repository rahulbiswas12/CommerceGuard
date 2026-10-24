import type { Page, Locator } from '@playwright/test';
export class CartPage {
  readonly items: Locator;
  readonly names: Locator;
  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.names = this.items.getByTestId('inventory-item-name');
  }
  async remove(name: string): Promise<void> {
    await this.items
      .filter({ hasText: name })
      .getByRole('button', { name: 'Remove', exact: true })
      .click();
  }
  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
  async checkout(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Checkout', exact: true })
      .click();
  }
}
