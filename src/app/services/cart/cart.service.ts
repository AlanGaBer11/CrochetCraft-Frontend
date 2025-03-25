import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly apiURL = 'http://localhost:3000/api/cart';

  constructor(private readonly http: HttpClient) {}

  // OBTENER EL CARRITO DEL USUARIO
  getCar(): Observable<any> {
    return this.http.get(`${this.apiURL}`);
  }

  // AGREGAR PRODUCTOS AL CARITO
  addToCart(data: string): Observable<any> {
    return this.http.post(`${this.apiURL}/add`, data);
  }

  // REMOVER PRODUCTOS DEL CARRITO
  remove(): Observable<any> {
    return this.http.delete(`${this.apiURL}/remove`);
  }

  // LIMPIAR CARRITO
  clear(): Observable<any> {
    return this.http.delete(`${this.apiURL}/clear`);
  }
}
