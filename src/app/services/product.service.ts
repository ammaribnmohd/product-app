import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'https://api.escuelajs.co/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // Get all products
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(API);
  }

  // Get products with pagination
  getAllByPagination(offset = 0, limit = 100): Observable<any[]> {
    return this.http.get<any[]>(`${API}?offset=${offset}&limit=${limit}`);
  }

  // Get one product by ID
  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${API}/${id}`);
  }

  // Get one product by slug
  getOneBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${API}/slug/${slug}`);
  }

  // Get related products by slug
  getRelatedBySlug(slug: string): Observable<any[]> {
    return this.http.get<any[]>(`${API}/slug/${slug}/related`);
  }

  create(product: any): Observable<any> {
    return this.http.post(API, product);
  }

  update(id: number, changes: any): Observable<any> {
    return this.http.put(`${API}/${id}`, changes);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API}/${id}`);
  }
}
