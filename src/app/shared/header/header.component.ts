// header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  cartItemCount: number = 0;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.subscription.add(this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.amount, 0);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openCart(): void {
    this.cartService.openCartModal();
  }
}
