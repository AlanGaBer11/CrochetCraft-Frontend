import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:3000/api/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService
  ) {}

  // REGISTRAR USUARIO
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // LOGEAR USUARIO
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // ESTABLECER TOKEN
  setToken(token: String) {
    this.cookies.set('token', token);
  }

  // OBTENER TOKEN
  getToken() {
    return this.cookies.get('token');
  }

  // ENVIAR CODIGO DE VERIFICACIÓN
  sendVerificationCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-verification-code`, email);
  }

  // VERIFICAR CODIGO DE VERIFICACIÓN
  verifyCode(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-code`, code);
  }

  // ENVIAR CORREO PARA RESTABLECER CONTRASEÑA
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, email);
  }

  // RESTABLECER CONTRASEÑA
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
    });
  }
}
