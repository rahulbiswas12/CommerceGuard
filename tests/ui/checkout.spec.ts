import { test, expect } from '../../fixtures/test-fixtures.js';
import { backpack } from '../../data/products.js';
import { customer } from '../../utils/test-data-builder.js';
test.beforeEach(async ({ authenticatedProducts: catalog, cartPage }) => {
  await catalog.add(backpack.name);
  await catalog.cart();
  await cartPage.checkout();
});
test('TC-019: Checkout starts at customer information', async ({ page }) => {
  await expect(page).toHaveURL(/checkout-step-one.html$/);
  await expect(page.getByTestId('firstName')).toBeVisible();
});
for (const row of [
  {
    id: '020',
    data: customer({ firstName: '', lastName: '', postalCode: '' }),
    error: 'First Name is required',
  },
  {
    id: '021',
    data: customer({ lastName: '', postalCode: '' }),
    error: 'Last Name is required',
  },
  {
    id: '022',
    data: customer({ postalCode: '' }),
    error: 'Postal Code is required',
  },
]) {
  test(`TC-${row.id}: Checkout rejects ${row.error}`, async ({
    checkoutPage,
    page,
  }) => {
    await checkoutPage.fill(row.data);
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText(row.error);
    await expect(page).toHaveURL(/checkout-step-one.html$/);
  });
}
