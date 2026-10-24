import { test, expect } from '../../fixtures/test-fixtures.js';
import { backpack, bikeLight } from '../../data/products.js';
import { customer } from '../../utils/test-data-builder.js';
test('TC-023: Purchase retains cart contents and reconciles totals through confirmation', async ({
  authenticatedProducts: catalog,
  cartPage,
  checkoutPage,
  page,
}) => {
  const selected = [backpack, bikeLight];
  for (const product of selected) await catalog.add(product.name);
  await catalog.cart();
  await expect(cartPage.names).toHaveText(selected.map((p) => p.name));
  await cartPage.checkout();
  await checkoutPage.fill(customer());
  await checkoutPage.continue();
  await expect(checkoutPage.names).toHaveText(selected.map((p) => p.name));
  await expect(page.getByTestId('inventory-item-price')).toHaveText(
    selected.map((p) => `$${p.price.toFixed(2)}`),
  );
  const subtotal = selected.reduce(
    (sum, p) => sum + Math.round(p.price * 100),
    0,
  );
  await expect(checkoutPage.subtotal).toHaveText(
    `Item total: $${(subtotal / 100).toFixed(2)}`,
  );
  const taxText = await checkoutPage.tax.innerText();
  const tax = Number(taxText.split('$')[1]);
  expect(Number.isFinite(tax)).toBe(true);
  expect(tax).toBeGreaterThanOrEqual(0);
  await expect(checkoutPage.total).toHaveText(
    `Total: $${((subtotal + Math.round(tax * 100)) / 100).toFixed(2)}`,
  );
  await checkoutPage.finish();
  await expect(checkoutPage.confirmation).toHaveText(
    'Thank you for your order!',
  );
  await expect(page).toHaveURL(/checkout-complete.html$/);
  await expect(catalog.badge).toHaveCount(0);
  await page.getByRole('button', { name: 'Back Home' }).click();
  await catalog.cart();
  await expect(cartPage.items).toHaveCount(0);
});
