import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject para el carrito
  private readonly cartUpdated = new BehaviorSubject<boolean>(false);

  // Observable público que los componentes pueden suscribirse
  cartUpdated$ = this.cartUpdated.asObservable();

  constructor(private readonly http: HttpClient) {}

  // Método para notificar cambios en el carrito
  notifyCartUpdated(): void {
    this.cartUpdated.next(true);
  }

  // OBTENER EL CARRITO DEL USUARIO
  getCart(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cart`);
  }

  // AGREGAR PRODUCTOS AL CARRITO
  addToCart(productData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/cart/add`, productData).pipe(
      tap(() => {
        // Notificar que el carrito se ha actualizado
        this.notifyCartUpdated();
      })
    );
  }

  // REMOVER PRODUCTO DEL CARRITO
  removeCartItem(nombre: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { nombre },
    };

    return this.http.delete(`${environment.apiUrl}/cart/remove`, options).pipe(
      tap(() => {
        this.notifyCartUpdated();
      })
    );
  }

  // ACTUALIZAR CANTIDAD DE UN ITEM
  updateCartItem(
    nombre: string,
    cantidad: number,
    operacion: string
  ): Observable<any> {
    const updateData = {
      nombre: nombre,
      cantidad: cantidad,
      operacion: operacion,
    };

    return this.http
      .patch(`${environment.apiUrl}/cart/update`, updateData)
      .pipe(
        tap(() => {
          this.notifyCartUpdated();
        })
      );
  }

  // LIMPIAR CARRITO
  clear(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/cart/clear`).pipe(
      tap(() => {
        this.notifyCartUpdated();
      })
    );
  }
}
