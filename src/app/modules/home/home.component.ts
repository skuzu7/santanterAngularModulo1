import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces/products/product';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('Loaded products:', products);  // Debugging: Check the structure of products
        this.products = products;
      },
      error: (err: any) => console.error('Failed to load products', err)
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
