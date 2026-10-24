import { test, expect } from '../../fixtures/test-fixtures.js';
test('TC-008: Logout returns to login', async ({
  authenticatedProducts,
  loginPage,
  page,
}) => {
  await authenticatedProducts.logout();
  await expect(loginPage.username).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});
test('TC-009: Inventory is protected after logout', async ({
  authenticatedProducts,
  loginPage,
  page,
}) => {
  await authenticatedProducts.logout();
  await page.goto('/inventory.html');
  await expect(loginPage.error).toContainText(
    "You can only access '/inventory.html' when you are logged in.",
  );
  await expect(loginPage.username).toBeVisible();
});
