import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationHomeService } from '../../services/navigationhome.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  productId: number | null = null;
  product: any = {
    title: '',
    price: null,
    description: '',
    categoryId: null,
    images: [''],
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationhome: NavigationHomeService
  ) {}
  goBack() {
    this.navigationhome.goBack();
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = +id;
      this.productService.getOne(this.productId).subscribe((data) => {
        this.product = {
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.category?.id || 1,
          images: data.images,
        };
      });
    }
  }

  submitForm() {
    const payload = {
      title: this.product.title,
      price: this.product.price,
      description: this.product.description,
      categoryId: this.product.categoryId,
      images: this.product.images,
    };

    if (this.isEdit && this.productId) {
      this.productService.update(this.productId, payload).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.productService.create(payload).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          console.error('Create failed', err);
          alert('Failed to create product. Please check your input.');
        },
      });
    }
  }
}
