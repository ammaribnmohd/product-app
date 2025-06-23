import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { NavigationHomeService } from '../../services/navigationhome.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private navigationhome: NavigationHomeService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.product = null;
      this.relatedProducts = [];
      this.productService.getOne(id).subscribe(data => {
        this.product = data;
        if (data && data.slug) {
          this.productService.getRelatedBySlug(data.slug).subscribe(related => {
            // Filter out the current product from the related list
            this.relatedProducts = related.filter(p => p.id !== this.product.id);
          });
        }
      });
    });
  }

  goBack() {
    this.navigationhome.goBack();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}