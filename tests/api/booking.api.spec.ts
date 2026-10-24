import { test, expect } from '../../fixtures/test-fixtures.js';
import { booking } from '../../utils/test-data-builder.js';
test('API-004: Booking lifecycle authenticates, creates, reads, updates and deletes owned data', async ({
  bookingApi,
}) => {
  const auth = await bookingApi.auth();
  expect(auth.status()).toBe(200);
  const authBody: unknown = await auth.json();
  expect(authBody).toEqual(
    expect.objectContaining({ token: expect.any(String) }),
  );
  const token = (authBody as { token: string }).token;
  expect(token.length).toBeGreaterThan(0);
  const payload = booking();
  let id: number | undefined;
  try {
    const created = await bookingApi.create(payload);
    expect(created.status()).toBe(200);
    const body: unknown = await created.json();
    if (
      typeof body === 'object' &&
      body !== null &&
      'bookingid' in body &&
      typeof body.bookingid === 'number' &&
      Number.isInteger(body.bookingid)
    ) {
      id = body.bookingid;
    }
    expect(body).toEqual(
      expect.objectContaining({
        bookingid: expect.any(Number),
        booking: payload,
      }),
    );
    if (id === undefined)
      throw new Error('Create booking response has no integer bookingid');
    const read = await bookingApi.get(id);
    expect(read.status()).toBe(200);
    expect(await read.json()).toEqual(payload);
    const forbidden = await bookingApi.update(id, payload);
    expect(forbidden.status()).toBe(403);
    const updated = { ...payload, totalprice: 456 };
    const response = await bookingApi.update(id, updated, token);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(updated);
    const persisted = await bookingApi.get(id);
    expect(persisted.status()).toBe(200);
    expect(await persisted.json()).toEqual(updated);
  } finally {
    if (id !== undefined) {
      const deleted = await bookingApi.delete(id, token);
      expect(deleted.status(), `Cleanup booking ${id}`).toBe(201);
      const missing = await bookingApi.get(id);
      expect(missing.status()).toBe(404);
    }
  }
});
test('API-005: Invalid authentication returns documented reason without a token', async ({
  bookingApi,
}) => {
  const response = await bookingApi.auth('invalid-commerceguard', 'incorrect');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ reason: 'Bad credentials' });
});
