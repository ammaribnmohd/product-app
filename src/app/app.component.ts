import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'product-app';
  cartItemCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItemCount$ = this.cartService.getItems().pipe(
      map(items => items.length)
    );
  }
}
