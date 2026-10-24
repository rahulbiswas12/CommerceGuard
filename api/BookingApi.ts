import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Booking } from '../utils/test-data-builder.js';
export class BookingApi {
  constructor(private readonly request: APIRequestContext) {}
  auth(username = 'admin', password = 'password123'): Promise<APIResponse> {
    return this.request.post('/auth', { data: { username, password } });
  }
  create(data: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data });
  }
  get(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }
  update(id: number, data: Booking, token?: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data,
      headers: token ? { Cookie: `token=${token}` } : {},
    });
  }
  delete(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}
