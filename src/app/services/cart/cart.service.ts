// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/interfaces/products/product';
import { DialogService } from 'primeng/dynamicdialog';
import { CartModalComponent } from 'src/app/shared/cart-modal/cart-modal.component';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.loadCartItems());
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private dialogService: DialogService, private messageService: MessageService) {}

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.findIndex(item => item._id === product._id);
    if (index !== -1) {
      currentItems[index].amount += 1;
    } else {
      currentItems.push({ ...product, amount: 1 });
    }
    this.cartItemsSubject.next([...currentItems]);  // Avoid mutation
    this.saveCartItems();
    this.showMessage('Produto adicionado com sucesso!');
  }

  decrementQuantity(product: Product): void {
    let currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.findIndex(item => item._id === product._id);
    if (index !== -1 && currentItems[index].amount > 1) {
      currentItems[index].amount -= 1;
    } else {
      currentItems = currentItems.filter(item => item._id !== product._id);
    }
    this.cartItemsSubject.next([...currentItems]);
    this.saveCartItems();
  }

  removeItem(product: Product): void {
    const newItems = this.cartItemsSubject.getValue().filter(item => item._id !== product._id);
    this.cartItemsSubject.next(newItems);
    this.saveCartItems();
    this.showMessage('Item removido com sucesso!');
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
    this.showMessage('Carrinho esvaziado com sucesso!');
  }

  openCartModal(): void {
    this.dialogService.open(CartModalComponent, {
      header: 'Carrinho de Compras',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });
  }

  private saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.getValue()));
  }

  private loadCartItems(): Product[] {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  }

  private showMessage(detail: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: detail, life: 3000 });
  }
}
