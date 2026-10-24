import { test, expect } from '../../fixtures/test-fixtures.js';
test('API-001: Product list has requested pagination and required field types', async ({
  productsApi,
}) => {
  const response = await productsApi.list(3);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  const body: unknown = await response.json();
  expect(body).toEqual(
    expect.objectContaining({
      limit: 3,
      skip: 0,
      total: expect.any(Number),
      products: expect.any(Array),
    }),
  );
  const items = (body as { products: unknown[] }).products;
  expect(items).toHaveLength(3);
  for (const product of items)
    expect(product).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        price: expect.any(Number),
      }),
    );
});
test('API-002: Read product by stable ID', async ({ productsApi }) => {
  const response = await productsApi.get(1);
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(
    expect.objectContaining({
      id: 1,
      title: expect.any(String),
      price: expect.any(Number),
    }),
  );
});
test('API-003: Unknown product returns not found', async ({ productsApi }) => {
  const response = await productsApi.get(999999999);
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual(
    expect.objectContaining({ message: expect.any(String) }),
  );
});
