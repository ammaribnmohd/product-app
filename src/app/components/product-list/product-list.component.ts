import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule,  } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchSlug: string = '';

  constructor(private productService: ProductService) {}

   ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getAllByPagination().subscribe(data => {
      console.log('Products fetched from API:', data);
      this.products = data;
    });
  }
  searchBySlug(): void {
    if (!this.searchSlug.trim()) {
      return;
    }

    this.productService.getOneBySlug(this.searchSlug).subscribe({
      next: (product) => {
        this.products = [product];
      },
      error: (err) => {
        console.error('Error fetching product by slug', err);
        alert(`Product with slug "${this.searchSlug}" not found.`);
        this.products = [];
      }
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
   resetSearch(): void {
    this.searchSlug = '';
    this.loadAllProducts();
  }
}