import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],  // ✅ Fixes *ngIf & *ngFor errors
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;
  userId!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('userId');
    if (!uid) {
      alert('Please login first!');
      return;
    }
    this.userId = Number(uid);
    this.loadCart();
  }

  // Load cart items
  loadCart(): void {
    this.cartService.getCartItems(this.userId).subscribe({
      next: (items: any[]) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (err) => console.error(err)
    });
  }

  // Calculate total
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // Remove single item
  removeItem(id: number): void {
    this.cartService.removeFromCart(id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });
  }

  // Place order and clear cart
  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const orderData = {
      userId: this.userId,
      totalAmount: this.totalAmount,
      status: 'Pending',
      items: this.cartItems.map(item => item.food?.name || 'Item')
    };

    this.orderService.checkout(orderData).subscribe({
      next: () => {
        this.cartService.clearCart(this.userId).subscribe({
          next: () => {
            this.cartItems = [];
            this.totalAmount = 0;
            alert('Order placed and cart cleared!');
          },
          error: (err) => {
            console.error('Clear cart error:', err);
            alert('Order placed but failed to clear cart!');
          }
        });
      },
      error: (err) => {
        console.error('Checkout failed:', err);
        alert('Order failed!');
      }
    });
  }
}