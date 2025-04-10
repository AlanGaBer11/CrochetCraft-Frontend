import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly toast: HotToastService) {}

  /* MÉTODOS GENÉRICOS */
  showSuccess(mensaje: string) {
    return this.toast.success(mensaje, {
      duration: 4000,
      autoClose: false,
      dismissible: true,
      style: {
        textAlign: 'center',
      },
    });
  }

  showError(mensaje: string) {
    return this.toast.error(mensaje, {
      duration: 4000,
      autoClose: false,
      dismissible: true,
      style: {
        textAlign: 'center',
      },
    });
  }

  showInfo(mensaje: string) {
    return this.toast.info(mensaje, {
      duration: 4000,
      autoClose: false,
      dismissible: true,
      style: {
        textAlign: 'center',
      },
    });
  }

  showWarning(mensaje: string) {
    return this.toast.warning(mensaje, {
      duration: 4000,
      autoClose: false,
      dismissible: true,
      style: {
        textAlign: 'center',
      },
    });
  }

  showLoading(mensaje: string = 'Cargando...') {
    return this.toast.loading(mensaje);
  }

  // Método mejorado para observar operaciones asíncronas
  observe<T>(options: {
    loading?: string;
    success?: string | ((result: T) => string);
    error?: string | ((error: any) => string);
    delayMs?: number;
  }) {
    return (source: Observable<T>) =>
      source.pipe(
        delay(options.delayMs ?? 2000),
        this.toast.observe({
          loading: options.loading ?? 'Cargando...',
          success: options.success || '¡Operación Completada Con Éxito!',
          error: options.error || 'Ha Ocurrido Un Error',
        })
      );
  }
}
