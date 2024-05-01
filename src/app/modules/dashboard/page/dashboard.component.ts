import { Component, OnInit } from '@angular/core';

import { Order } from '../models/order';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders = this.ordersService.getOrders();
  }
}
