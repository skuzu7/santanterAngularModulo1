import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/models/interfaces/products/product';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  incrementQuantity(item: Product): void {
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: Product): void {
    this.cartService.decrementQuantity(item);
  }

  removeItem(item: Product): void {
    this.cartService.removeItem(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
  }

  checkout(): void {
    console.log('Finalizando a compra...');
    this.ref.close();
  }
}
