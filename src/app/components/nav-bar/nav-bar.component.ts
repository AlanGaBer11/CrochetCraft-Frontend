import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  nombre: string | null = null;
  private authSubscription!: Subscription;
  cartItems: any[] = [];
  precioTotal: number = 0;
  private cartSubscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();

    if (this.isLoggedIn) {
      this.getCart();
    }

    this.authSubscription = this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        if (this.isLoggedIn) {
          this.nombre = this.authService.getUserName();
          this.getCart();
        } else {
          this.nombre = null;
          this.cartItems = [];
        }
      }
    );
    // Suscribirse a las actualizaciones del carrito
    this.cartSubscription = this.cartService.cartUpdated$.subscribe(
      (updated) => {
        if (updated && this.isLoggedIn) {
          this.getCart();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  checkAuthentication(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.nombre = this.authService.getUserName();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAuthenticated() && this.authService.isAdmin();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  getCart(): void {
    if (!this.isLoggedIn) return;

    this.cartSubscription = this.cartService.getCart().subscribe({
      next: (response: any) => {
        if (response.success && response.cart) {
          // Set cart items
          this.cartItems =
            response.cart.items?.map((item: any) => ({
              _id: item._id,
              productId: item.productId,
              name: item.nombre,
              category: item.categoria,
              quantity: item.cantidad,
              price: item.precioUnitario,
              subtotal: item.cantidad * item.precioUnitario,
            })) || [];

          // Set the total price from the response
          this.precioTotal = response.cart.precioTotal || 0;
        } else {
          this.cartItems = [];
          this.precioTotal = 0;
        }
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        this.cartItems = [];
        this.precioTotal = 0;
      },
    });
  }
}
