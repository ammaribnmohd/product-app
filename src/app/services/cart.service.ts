import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private cart = new BehaviorSubject<any[]>([]);

  constructor() { }

  getItems(): Observable<any[]> {
    return this.cart.asObservable();
  }

  addToCart(product: any) {
    this.items.push(product);
    this.cart.next(this.items);
    alert('Product added to cart!');
  }

  clearCart() {
    this.items = [];
    this.cart.next(this.items);
  }
}