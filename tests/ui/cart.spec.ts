import { test, expect } from '../../fixtures/test-fixtures.js';
import { backpack, bikeLight } from '../../data/products.js';
test('TC-016: Cart preserves selected products and prices', async ({
  authenticatedProducts: catalog,
  cartPage,
}) => {
  await catalog.add(backpack.name);
  await catalog.add(bikeLight.name);
  await catalog.cart();
  await expect(cartPage.names).toHaveText([backpack.name, bikeLight.name]);
  await expect(cartPage.items.getByTestId('inventory-item-price')).toHaveText([
    '$29.99',
    '$9.99',
  ]);
});
test('TC-017: Removing products updates cart and clears badge', async ({
  authenticatedProducts: catalog,
  cartPage,
}) => {
  await catalog.add(backpack.name);
  await catalog.add(bikeLight.name);
  await catalog.cart();
  await cartPage.remove(backpack.name);
  await expect(cartPage.names).toHaveText([bikeLight.name]);
  await expect(catalog.badge).toHaveText('1');
  await cartPage.remove(bikeLight.name);
  await expect(cartPage.items).toHaveCount(0);
  await expect(catalog.badge).toHaveCount(0);
});
test('TC-018: Continue shopping returns to inventory', async ({
  authenticatedProducts: catalog,
  cartPage,
  page,
}) => {
  await catalog.cart();
  await cartPage.continueShopping();
  await expect(page).toHaveURL(/inventory.html$/);
  await expect(catalog.title).toHaveText('Products');
});
