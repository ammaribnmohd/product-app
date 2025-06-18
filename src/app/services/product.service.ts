import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'https://api.escuelajs.co/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllbyPagination(offset = 0, limit = 100): Observable<any[]> {
    return this.http.get<any[]>(`${API}?offset=${offset}&limit=${limit}`);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${API}/${id}`);
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
