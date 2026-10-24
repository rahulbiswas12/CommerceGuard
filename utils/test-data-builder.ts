import { randomUUID } from 'node:crypto';
import type { Customer } from '../pages/CheckoutPage.js';
export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds: string;
}
export function customer(overrides: Partial<Customer> = {}): Customer {
  return {
    firstName: 'Portfolio',
    lastName: 'Tester',
    postalCode: '700001',
    ...overrides,
  };
}
export function booking(): Booking {
  return {
    firstname: `CG-${randomUUID()}`,
    lastname: 'Demo',
    totalprice: 123,
    depositpaid: true,
    bookingdates: { checkin: '2027-01-10', checkout: '2027-01-12' },
    additionalneeds: 'Breakfast',
  };
}
