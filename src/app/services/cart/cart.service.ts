import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly http: HttpClient) {}

  // OBTENER EL CARRITO DEL USUARIO
  getCart(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cart`);
  }

  // AGREGAR PRODUCTOS AL CARITO
  addToCart(data: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/cart/add`, data);
  }

  // REMOVER PRODUCTOS DEL CARRITO
  remove(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/cart/remove`);
  }

  // LIMPIAR CARRITO
  clear(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/cart/clear`);
  }
}
