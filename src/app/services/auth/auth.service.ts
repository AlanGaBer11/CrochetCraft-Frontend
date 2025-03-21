import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly toast: HotToastService) {}

  /* AUTH */
  // MENSAJE PARA CUANDO SE REGISTRA UN USUARIO
  registroExitoso() {
    return this.toast.success('¡Registro Exitoso En CrochetCraft!', {
      duration: 4000,
    });
  }

  // MENSAJE PARA CUANDO SE INICIA SESIÓN
  loginExitoso(nombre: string) {
    return this.toast.success(`¡Bienvenido De Nuevo ${nombre}!`, {
      duration: 4000,
    });
  }

  // MENSAJE PARA CUANDO EL INICIO DE SESIÓN FALLA
  loginFallido() {
    return this.toast.error('¡Error Al Iniciar Sesión!', {
      duration: 4000,
    });
  }

  // MENSAJE DE CIERRE DE SESIÓN
  logout() {
    return this.toast.success('¡Has Cerrado Sesión Correctamente!', {
      duration: 4000,
      position: 'top-right',
    });
  }

  // MENSAJE PARA CUANDO SE ENVIA UN CORREO DE VERIFICACIÓN
  codigoVerificacion() {
    return this.toast.success('¡Código De Verificación Enviado!', {
      duration: 4000,
    });
  }

  // MENSAJE PARA CUANDO SE VERIFICA EL CODIGO DE VERIFICACIÓN
  codigoVerificado() {
    return this.toast.success('¡Código De Verificación Verificado!', {
      duration: 4000,
    });
  }

  // MENSAJE PARA CUANDO EL CODIGO DE VERIFICACIÓN FALLA
  codigoFallido() {
    return this.toast.error('¡Código De Verificación Incorrecto!', {
      duration: 4000,
    });
  }

  // MENSAJE PARA CUANDO SE MANDA UN CORREO PARA RESTABLECER LA CONTRASEÑA
  recuperarContraseña() {
    return this.toast.success('¡Correo Para Restablecer Contraseña Enviado!', {
      duration: 4000,
    });
  }

  // MENSAJE PARA CUANDO SE RESTABLECE LA CONTRASEÑA
  restablecimientoExitoso() {
    return this.toast.success('¡Contraseña Restablecida!', {
      duration: 4000,
    });
  }
  // MENSAJE PARA CUANDO EL RESTABLECIMIENTO DE CONTRASEÑA FALLA
  restablecimientoFallido() {
    return this.toast.error('¡Error Al Restablecer Contraseña!', {
      duration: 4000,
    });
  }
}
