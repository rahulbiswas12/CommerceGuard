import type { Page, Locator } from '@playwright/test';
export interface Customer {
  firstName: string;
  lastName: string;
  postalCode: string;
}
export class CheckoutPage {
  readonly error: Locator;
  readonly confirmation: Locator;
  readonly names: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  constructor(private readonly page: Page) {
    this.error = page.getByTestId('error');
    this.confirmation = page.getByTestId('complete-header');
    this.names = page.getByTestId('inventory-item-name');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
  }
  async fill(customer: Customer): Promise<void> {
    await this.page.getByTestId('firstName').fill(customer.firstName);
    await this.page.getByTestId('lastName').fill(customer.lastName);
    await this.page.getByTestId('postalCode').fill(customer.postalCode);
  }
  async continue(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Continue', exact: true })
      .click();
  }
  async finish(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Finish', exact: true })
      .click();
  }
}
