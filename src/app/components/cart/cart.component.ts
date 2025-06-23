import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items$!: Observable<any[]>;
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.items$ = this.cartService.getItems();
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      alert('Please select a payment method.');
      return;
    }
    alert('Order Confirmed!');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}