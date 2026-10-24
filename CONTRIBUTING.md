# Contributing

Install Node.js 22.13+ and run npm ci, then npx playwright install --with-deps. Copy .env.example to .env only if overriding sandbox origins. Use public demo data only.

Create a focused branch such as feat/cart-assertions or fix/checkout-locator. Keep specs independent, use descriptive IDs, semantic locators or configured test IDs, and put business assertions in specs. Add page actions only when reusable or when they hide locator details. Avoid fixed sleeps, unsafe type casts, explicit any, test-order dependencies, silent retries and generic BasePage abstractions.

Use strict TypeScript, ES module imports with .js extensions, and Prettier. Explain any intentional external dependency or skip. Never change assertions to hide a real upstream failure; document reproduction evidence instead. API mutation tests must use unique data and clean up only their own records.

Before opening a PR run:

```sh
npm run format
npm run lint
npm run typecheck
npm run format:check
npm run test:ui
npm run test:e2e
npm run test:api
```

Describe the behavior changed, why it matters, commands run and actual results. Report network/browser restrictions and failures honestly. Include reports only when useful and scrub sensitive data. Keep changes small enough to review; do not commit node_modules, generated reports or .env. A maintainer should review the PR and require the browser and external-api jobs to pass before merging, or explicitly investigate service outages. This repository does not own or accept contributions to the external applications.
