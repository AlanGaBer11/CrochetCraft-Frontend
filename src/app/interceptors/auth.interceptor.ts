import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Obtener el token
    const token = this.authService.getToken();

    // Si hay token, clonar la solicitud y agregar el encabezado de autorización
    if (token) {
      // Rutas que requieren autenticación
      const authRequiredPaths = [
        /* USERS (ADMIN) */
        '/user/getUsers',
        '/user/getUserById',
        '/user/createUser',
        '/user/updateUser',
        '/user/deleteUser',

        /* PRODUCTOS (ADMIN) */
        '/product/createProduct',
        '/product/updateProduct',
        '/product/deleteProduct',

        /* CARRITO */
        '/cart',
        '/cart/add',
        '/cart/remove',
        '/cart/clear',

        /* ORDENES */
        '/order/getOrders',
        '/order/getOrderById',
        '/order/createOrder',
        '/order/updtaeOrder',
        '/order/deleteOrder',

        /* RESEÑAS */
        '/review/createReview',
        '/review/updateReview',
        '/review/deleteReview',
      ];

      // Verificar si la URL actual necesita autorización
      const requiresAuth = authRequiredPaths.some((path) =>
        request.url.includes(path)
      );

      if (requiresAuth) {
        // Clonar la solicitud y agregar el encabezado de autorización
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    // Continuar con la solicitud y manejar errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401 (No autorizado), cerrar sesión y redirigir
        if (error.status === 401) {
          this.toastService.showError(
            'Tu sesión ha expirado, por favor inicia sesión nuevamente'
          );
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
        return throwError(() => error);
      })
    );
  }
}
