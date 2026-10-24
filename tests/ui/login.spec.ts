import { test, expect } from '../../fixtures/test-fixtures.js';
import { demoUser } from '../../data/users.js';
test('TC-001: Successful login displays products', async ({
  loginPage,
  productsPage,
  page,
}) => {
  await loginPage.goto();
  await loginPage.login(demoUser.username, demoUser.password);
  await expect(page).toHaveURL(/\/inventory.html$/);
  await expect(productsPage.title).toHaveText('Products');
});
test('TC-007: Password input masks credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.password.fill(demoUser.password);
  await expect(loginPage.password).toHaveAttribute('type', 'password');
});
