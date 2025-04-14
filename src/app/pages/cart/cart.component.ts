import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartData: any = null;
  cartItems: any[] = [];
  precioTotal: number = 0;
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private readonly cartService: CartService,
    private readonly toast: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cargando = true;
    this.error = null;

    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success && response.cart) {
          this.cartData = response.cart;
          this.cartItems = response.cart.items || [];
          this.precioTotal = response.cart.precioTotal || 0;
        } else {
          this.error = 'No se pudo cargar el carrito';
          this.toast.showError(this.error);
        }
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el carrito';
        this.toast.showError(this.error);
        this.cargando = false;
      },
    });
  }

  // Remover un producto del carrito
  removeItem(item: any): void {
    if (
      !confirm(
        '¿Estás seguro de que deseas eliminar este producto del carrito?'
      )
    ) {
      return;
    }

    this.cargando = true;

    // Asegurarnos de que estamos pasando el nombre correcto
    const nombreProducto = item.name || item.nombre;

    this.cartService.removeCartItem(nombreProducto).subscribe({
      next: (response) => {
        if (response.success) {
          this.toast.showSuccess('Producto eliminado del carrito');
          this.getCart(); // Refrescar el carrito después de eliminar
        } else {
          this.toast.showError(
            response.message || 'No se pudo eliminar el producto'
          );
          this.cargando = false;
        }
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        this.toast.showError('Error al eliminar el producto');
        this.cargando = false;
      },
    });
  }

  // Actualizar la cantidad de un producto
  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity < 1) return;

    this.cargando = true;

    // Determinar la operación
    const operacion =
      newQuantity > item.cantidad ? 'incrementar' : 'decrementar';

    // Para incrementar/decrementar enviamos el valor absoluto de la diferencia
    const cantidadCambio = Math.abs(newQuantity - item.cantidad);

    this.cartService
      .updateCartItem(item.name || item.nombre, cantidadCambio, operacion)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toast.showSuccess('Cantidad actualizada');
            this.getCart(); // Refrescar el carrito
          } else {
            this.toast.showError(
              response.message || 'No se pudo actualizar la cantidad'
            );
            this.cargando = false;
          }
        },
        error: (err) => {
          console.error('Error al actualizar cantidad:', err);
          this.toast.showError('Error al actualizar la cantidad');
          this.cargando = false;
        },
      });
  }

  // VACIAR CARRITO
  clearCart(): void {
    if (!confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      return;
    }
    this.cargando = true;
    this.cartService.clear().subscribe({
      next: (response) => {
        if (response.success) {
          this.toast.showSuccess('Carrito vaciado con éxito');
          this.getCart(); // Refrescar el carrito
        } else {
          this.toast.showError(
            response.message || 'No se pudo vaciar el carrito'
          );
          this.cargando = false;
        }
      },
      error: (err) => {
        console.error('Error al vaciar el carrito:', err);
        this.toast.showError('Error al vaciar el carrito');
        this.cargando = false;
      },
    });
  }
  // Navegación
  continueShopping(): void {
    this.router.navigate(['/categorias']);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
