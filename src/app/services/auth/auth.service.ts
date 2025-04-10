import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inicializar con un valor por defecto (false) en lugar de llamar a this.isAuthenticated()
  private readonly authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {
    // Actualizar el estado de autenticación después de que las dependencias estén disponibles
    this.authStatusSubject.next(this.isAuthenticated());
  }

  // MÉTODO PARA REGISTRAR UN NUEVO USUARIO
  register(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  // MÉTODO PARA INICIAR SESIÓN
  login(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, user);
  }

  // GUARDA EL TOKEN EN LA COOKIE
  saveToken(token: string, userData?: any): void {
    this.cookieService.set('token', token, { expires: 1, path: '/' });
    if (userData) {
      this.cookieService.set('userData', JSON.stringify(userData), {
        expires: 1,
        path: '/',
      });
    }
    // Notificar a los componentes que el estado de autenticación ha cambiado
    this.authStatusSubject.next(true);
  }

  // VERIFICA SI EL USUARIO ESTÁ AUTENTICADO
  isAuthenticated(): boolean {
    return this.cookieService.check('token'); // Verifica si el token existe
  }

  // VERIFICA EL ROL DEL USUARIO
  isAdmin(): boolean {
    const userDataStr = this.cookieService.get('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.rol === 'ADMIN';
      } catch (error) {
        console.error('Error al analizar los datos del usuario:', error);
        return false;
      }
    }
    return false;
  }

  // VERIFICA SI EL USUARIO TIENE UN ROL ESPECÍFICO
  hasRole(role: string): boolean {
    const userDataStr = this.cookieService.get('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.rol === role;
      } catch (error) {
        console.error('Error al analizar los datos del usuario:', error);
        return false;
      }
    }
    return false;
  }

  // CERRAR SESIÓN
  logout(): void {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('userData', '/');
    // Notificar a los componentes que el estado de autenticación ha cambiado
    this.authStatusSubject.next(false);
  }

  // OBTIENE LOS DATOS DEL USUARIO DE LA COOKIE
  getUserData(): any {
    try {
      const token = this.getToken();
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken;
      }
      return null;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  // OBTIENE EL NOMBRE DE LA COOKIE
  getUserName(): string {
    const userDataStr = this.cookieService.get('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        return userData.nombre || '';
      } catch (error) {
        console.error('Error al analizar los datos del usuario:', error);
        return '';
      }
    }
    return '';
  }

  // OBTIENE EL TOKEN DE LA COOKIE
  getToken(): string {
    return this.cookieService.get('token');
  }

  // ENVIAR CÓDIGO DE VERIFICACIÓN
  sendVerificationCode(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/send-verification-code`, {
      email,
    });
  }

  // VERIFICAR CÓDIGO DE VERIFICACIÓN
  verifyCode(code: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/verify-code`, { code });
  }

  // ENVIAR CORREO PARA RESTABLECER CONTRASEÑA
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/request-password-reset`, {
      email,
    });
  }

  // RESTABLECER CONTRASEÑA
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/reset-password`, {
      token,
      newPassword,
    });
  }
}
