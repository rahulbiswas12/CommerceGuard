import type { Page, Locator } from '@playwright/test';
export type SortOrder = 'az' | 'za' | 'lohi' | 'hilo';
export class ProductsPage {
  readonly items: Locator;
  readonly names: Locator;
  readonly prices: Locator;
  readonly badge: Locator;
  readonly title: Locator;
  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.names = this.items.getByTestId('inventory-item-name');
    this.prices = this.items.getByTestId('inventory-item-price');
    this.badge = page.getByTestId('shopping-cart-badge');
    this.title = page.getByTestId('title');
  }
  item(name: string): Locator {
    return this.items.filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }
  async add(name: string): Promise<void> {
    await this.item(name)
      .getByRole('button', { name: 'Add to cart', exact: true })
      .click();
  }
  async open(name: string): Promise<void> {
    await this.names.filter({ hasText: name }).click();
  }
  async sort(order: SortOrder): Promise<void> {
    await this.page.getByTestId('product-sort-container').selectOption(order);
  }
  async cart(): Promise<void> {
    await this.page.getByTestId('shopping-cart-link').click();
  }
  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
