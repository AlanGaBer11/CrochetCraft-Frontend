import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  precioTotal: number = 0;
  descuento: number = 0;
  subtotal: number = 0;
  cargando: boolean = true;
  procesandoOrden: boolean = false;
  error: string | null = null;
  selectedPaymentMethod: string = 'cash';

  // Mapeo de métodos de pago del UI a la API
  paymentMethodMap: { [key: string]: string } = {
    cash: 'Efectivo',
    credit: 'Tarjeta de Crédito',
    debit: 'Tarjeta de Débito',
    transfer: 'Transferencia',
  };

  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.toast.showError('Debes iniciar sesión para realizar una compra');
      this.router.navigate(['/auth']);
      return;
    }

    this.getCart();
  }

  getCart(): void {
    this.cargando = true;
    this.error = null;

    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success && response.cart) {
          // Procesar items del carrito
          this.cartItems =
            response.cart.items?.map((item: any) => ({
              _id: item._id,
              productId: item.productId,
              nombre: item.nombre,
              categoria: item.categoria,
              cantidad: item.cantidad,
              precioUnitario: item.precioUnitario,
              subtotal: item.cantidad * item.precioUnitario,
              urlImagen: item.urlImagen || 'assets/img/logo.png',
            })) || [];

          // Calcular totales
          this.subtotal = response.cart.precioTotal || 0;
          this.precioTotal = this.subtotal - this.descuento;

          this.cargando = false;
        } else {
          this.error = 'No se pudo cargar el carrito';
          this.toast.showError(this.error);
          this.cargando = false;
        }
      },
      error: (error) => {
        console.error('Error al cargar el carrito', error);
        this.error = 'Error al cargar el carrito';
        this.toast.showError(this.error);
        this.cargando = false;
      },
    });
  }

  onPaymentMethodChange(method: string): void {
    this.selectedPaymentMethod = method;
  }

  returnToCart(): void {
    this.router.navigate(['/carrito']);
  }

  confirmOrder(): void {
    if (this.cartItems.length === 0) {
      this.toast.showError('No hay productos en el carrito');
      return;
    }

    if (this.procesandoOrden) {
      return; // Evitar múltiples clics
    }

    this.procesandoOrden = true;
    this.toast.showInfo('Procesando tu pedido...');

    // Obtener el método de pago para la API
    const metodoPago =
      this.paymentMethodMap[this.selectedPaymentMethod] || 'Efectivo';

    // Crear objeto de datos para la API
    const orderData = {
      metodoPago: metodoPago,
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.procesandoOrden = false;

        if (response.success) {
          this.toast.showSuccess('¡Pedido confirmado! Gracias por tu compra');

          // Redirigir a la página de confirmación o de pedidos
          if (response.success) {
            this.router.navigate(['/perfil']);
          } else {
            this.router.navigate(['/carrito']);
          }
        } else {
          this.toast.showError(
            response.message || 'Error al procesar el pedido'
          );
        }
      },
      error: (error) => {
        this.procesandoOrden = false;
        console.error('Error al crear la orden', error);
        this.toast.showError(
          'No se pudo procesar tu pedido. Por favor, inténtalo de nuevo.'
        );
      },
    });
  }

  // Helper para mostrar el texto correcto del método de pago en UI
  getPaymentMethodText(): string {
    switch (this.selectedPaymentMethod) {
      case 'cash':
        return 'Efectivo';
      case 'credit':
        return 'Tarjeta de Crédito';
      case 'debit':
        return 'Tarjeta de Débito';
      case 'transfer':
        return 'Transferencia';
      default:
        return 'Efectivo';
    }
  }
}
