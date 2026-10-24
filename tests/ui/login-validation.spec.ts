import { test, expect } from '../../fixtures/test-fixtures.js';
import { invalidLogins } from '../../data/users.js';
for (const row of invalidLogins) {
  test(`TC-${row.id}: Login rejects ${row.title}`, async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(row.username, row.password);
    await expect(loginPage.error).toContainText(row.error);
    await expect(page).not.toHaveURL(/inventory.html/);
  });
}
