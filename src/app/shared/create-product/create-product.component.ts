import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  productForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      image: ['']
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.productForm.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService.createProduct(product).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product created successfully' });
          this.productForm.reset();
          this.selectedImage = null;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create product' });
        }
      );
    }
  }
}
