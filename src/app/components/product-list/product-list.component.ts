import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule,  } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllbyPagination().subscribe(data => {
      console.log('Products fetched from API:', data)
      this.products = data;
    });
  }
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          alert(`Product with id ${id} deleted successfully.`);
        },
        error: (err) => {
          console.error(`Error deleting product with id ${id}`, err);
          alert('Failed to delete product.');
        }
      });
    }
  }
}