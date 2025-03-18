import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastServiceService {
  constructor(private readonly toast: HotToastService) {}

  // Product related toasts
  productAdded(productName: string) {
    return this.toast.success(`¡${productName} añadido al carrito!`, {
      duration: 3000,
      position: 'bottom-right',
    });
  }

  productRemoved(productName: string) {
    return this.toast.info(`${productName} eliminado del carrito`, {
      duration: 3000,
      position: 'bottom-right',
    });
  }

  productOutOfStock(productName: string) {
    return this.toast.warning(
      `¡${productName} no está disponible en este momento!`,
      {
        duration: 4000,
        position: 'bottom-right',
      }
    );
  }

  // Cart related toasts
  cartUpdated() {
    return this.toast.info('Carrito actualizado', {
      duration: 2000,
      position: 'bottom-right',
    });
  }

  cartCleared() {
    return this.toast.info('Carrito vaciado', {
      duration: 2000,
      position: 'bottom-right',
    });
  }

  // Order related toasts
  orderPlaced(orderNumber: string) {
    return this.toast.success(`¡Pedido #${orderNumber} realizado con éxito!`, {
      duration: 5000,
      position: 'bottom-center',
    });
  }

  orderFailed() {
    return this.toast.error(
      'Error al procesar el pedido. Inténtalo de nuevo.',
      {
        duration: 5000,
        position: 'bottom-center',
      }
    );
  }

  // Payment related toasts
  paymentSuccess() {
    return this.toast.success('¡Pago procesado con éxito!', {
      duration: 4000,
      position: 'bottom-center',
    });
  }

  paymentFailed() {
    return this.toast.error(
      'Error al procesar el pago. Verifica tus datos e inténtalo de nuevo.',
      {
        duration: 5000,
        position: 'bottom-center',
      }
    );
  }

  // User account related toasts
  loginSuccess(userName: string) {
    return this.toast.success(`¡Bienvenido/a, ${userName}!`, {
      duration: 3000,
      position: 'top-right',
    });
  }

  loginFailed() {
    return this.toast.error(
      'Error al iniciar sesión. Verifica tus credenciales.',
      {
        duration: 4000,
        position: 'top-right',
      }
    );
  }

  registrationSuccess() {
    return this.toast.success(
      '¡Registro exitoso! Bienvenido/a a CrochetCraft.',
      {
        duration: 4000,
        position: 'top-center',
      }
    );
  }

  logoutSuccess() {
    return this.toast.info('Has cerrado sesión correctamente', {
      duration: 3000,
      position: 'top-right',
    });
  }

  // Wishlist related toasts
  addedToWishlist(productName: string) {
    return this.toast.success(`${productName} añadido a tu lista de deseos`, {
      duration: 3000,
      position: 'bottom-right',
    });
  }

  removedFromWishlist(productName: string) {
    return this.toast.info(`${productName} eliminado de tu lista de deseos`, {
      duration: 3000,
      position: 'bottom-right',
    });
  }

  // General error toast
  showError(message: string) {
    return this.toast.error(message, {
      duration: 4000,
      position: 'top-center',
    });
  }
}
