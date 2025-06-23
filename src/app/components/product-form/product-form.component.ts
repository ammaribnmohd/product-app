import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationHomeService } from '../../services/navigationhome.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  productId: number | null = null;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationhome: NavigationHomeService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      categoryId: [null, [Validators.required]],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  goBack() {
    this.navigationhome.goBack();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = +id;
      this.productService.getOne(this.productId).subscribe((data) => {
        this.productForm.patchValue({
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.category?.id || 1,
          image: data.images && data.images.length > 0 ? data.images[0] : '',
        });
      });
    }
  }

  submitForm() {
    if (this.productForm.invalid) {
      return;
    }

    const formValue = this.productForm.value;
    const payload = {
      title: formValue.title,
      price: formValue.price,
      description: formValue.description,
      categoryId: formValue.categoryId,
      images: [formValue.image],
    };

    if (this.isEdit && this.productId) {
      this.productService.update(this.productId, payload).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.productService.create(payload).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
