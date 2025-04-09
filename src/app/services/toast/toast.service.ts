import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toast: HotToastService) {}

  /* MÉTODOS GENÉRICOS */
  showSuccess(mensaje: string) {
    return this.toast.success(mensaje, {
      duration: 5000,
      style: {
        widht: 'auto',
      },
    });
  }

  showError(mensaje: string) {
    return this.toast.error(mensaje, {
      duration: 5000,
      style: {
        widht: 'auto',
      },
    });
  }

  showInfo(mensaje: string) {
    return this.toast.info(mensaje, {
      duration: 5000,
    });
  }

  showWarning(mensaje: string) {
    return this.toast.warning(mensaje, {
      duration: 5000,
      style: {
        widht: 'auto',
      },
    });
  }

  showLoading(mensaje: string = 'Cargando...') {
    return this.toast.loading(mensaje);
  }

  // FALTA PROBAR
  showPromise<T>(
    promise: Promise<T>,
    mensajes: { loading?: string; success?: string; error?: string }
  ) {
    return this.toast.observe({
      loading: mensajes.loading ?? 'Cargando...',
      success: mensajes.success ?? '¡Operación completada!',
      error: mensajes.error ?? 'Ha ocurrido un error',
    });
  }
}
