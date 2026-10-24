import type { APIRequestContext, APIResponse } from '@playwright/test';
export class ProductsApi {
  constructor(private readonly request: APIRequestContext) {}
  list(limit = 5): Promise<APIResponse> {
    return this.request.get('/products', { params: { limit } });
  }
  get(id: number): Promise<APIResponse> {
    return this.request.get(`/products/${id}`);
  }
}
