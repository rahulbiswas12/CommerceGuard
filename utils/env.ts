import { existsSync } from 'node:fs';
import { environments } from '../config/environments.js';
if (existsSync('.env')) process.loadEnvFile('.env');
const name = process.env.TEST_ENV ?? 'demo';
if (name !== 'demo') throw new Error(`Unsupported TEST_ENV: ${name}`);
function url(value: string): string {
  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol))
    throw new Error('Expected HTTP(S) URL');
  return parsed.origin;
}
export const env = {
  ui: url(process.env.UI_BASE_URL ?? environments.demo.ui),
  products: url(process.env.PRODUCTS_API_URL ?? environments.demo.products),
  booking: url(process.env.BOOKING_API_URL ?? environments.demo.booking),
};
