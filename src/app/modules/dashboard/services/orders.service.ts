import { Injectable } from '@angular/core';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Order[] = [
    { id: 'GROWTH7-11089-00037', date: '19/02/2024 13:45:00', value: 'R$ 410,43', status: 'Enviado' },
    // ... outros pedidos
  ];

  constructor() { }

  getOrders(): Order[] {
    return this.orders;
  }
}
