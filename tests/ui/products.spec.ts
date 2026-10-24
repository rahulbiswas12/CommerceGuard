import { test, expect } from '../../fixtures/test-fixtures.js';
import { products, backpack, bikeLight } from '../../data/products.js';
import type { SortOrder } from '../../pages/ProductsPage.js';
test('TC-010: Catalog shows expected names, prices and count', async ({
  authenticatedProducts: catalog,
}) => {
  await expect(catalog.items).toHaveCount(products.length);
  for (const product of products) {
    await expect(
      catalog.item(product.name).getByTestId('inventory-item-name'),
    ).toHaveText(product.name);
    await expect(
      catalog.item(product.name).getByTestId('inventory-item-price'),
    ).toHaveText(`$${product.price.toFixed(2)}`);
  }
});
test('TC-011: Product details match selected product', async ({
  authenticatedProducts: catalog,
  page,
}) => {
  await catalog.open(backpack.name);
  await expect(page).toHaveURL(/inventory-item.html\?id=4$/);
  await expect(page.getByTestId('inventory-item-name')).toHaveText(
    backpack.name,
  );
  await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');
});
test('TC-012: Add individual product updates button and badge', async ({
  authenticatedProducts: catalog,
}) => {
  await catalog.add(backpack.name);
  await expect(
    catalog.item(backpack.name).getByRole('button', { name: 'Remove' }),
  ).toBeVisible();
  await expect(catalog.badge).toHaveText('1');
});
test('TC-013: Add multiple products updates badge', async ({
  authenticatedProducts: catalog,
}) => {
  await catalog.add(backpack.name);
  await catalog.add(bikeLight.name);
  await expect(catalog.badge).toHaveText('2');
});
for (const order of [
  'az',
  'za',
  'lohi',
  'hilo',
] as const satisfies readonly SortOrder[]) {
  test(`TC-014-${order}: Sort catalog by ${order}`, async ({
    authenticatedProducts: catalog,
  }) => {
    await catalog.sort(order);
    const byName = order === 'az' || order === 'za';
    const expected = [...products].sort((a, b) =>
      byName ? a.name.localeCompare(b.name) : a.price - b.price,
    );
    if (order === 'za' || order === 'hilo') expected.reverse();
    if (byName)
      await expect(catalog.names).toHaveText(expected.map((p) => p.name));
    else
      await expect(catalog.prices).toHaveText(
        expected.map((p) => `$${p.price.toFixed(2)}`),
      );
  });
}
test('TC-015: Intercepted product image is rendered from a controlled response', async ({
  page,
  authenticatedProducts: catalog,
}) => {
  const image = catalog.item(backpack.name).locator('img');
  const source = await image.getAttribute('src');
  expect(source).toBeTruthy();
  const imageUrl = new URL(source!, page.url()).href;
  let intercepted = false;
  await page.route(imageUrl, async (route) => {
    intercepted = true;
    await route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="green"/></svg>',
    });
  });
  await page.reload();
  await expect.poll(() => intercepted).toBe(true);
  await expect
    .poll(() =>
      image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    )
    .toBe(8);
});
