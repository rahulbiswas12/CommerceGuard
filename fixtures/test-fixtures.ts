import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ProductsApi } from '../api/ProductsApi.js';
import { BookingApi } from '../api/BookingApi.js';
import { demoUser } from '../data/users.js';
import { env } from '../utils/env.js';
type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedProducts: ProductsPage;
  productsApi: ProductsApi;
  bookingApi: BookingApi;
};
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  authenticatedProducts: async ({ loginPage, productsPage }, use) => {
    await loginPage.goto();
    await loginPage.login(demoUser.username, demoUser.password);
    await expect(productsPage.title).toHaveText('Products');
    await use(productsPage);
  },
  productsApi: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: env.products,
    });
    try {
      await use(new ProductsApi(context));
    } finally {
      await context.dispose();
    }
  },
  bookingApi: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: env.booking,
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    try {
      await use(new BookingApi(context));
    } finally {
      await context.dispose();
    }
  },
});
export { expect };
