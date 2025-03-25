import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/api/order';

  constructor(private readonly http: HttpClient) {}

  // OBTENER TODAS LAS ORDENES
  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrders`);
  }

  //OBTENER UNA ORDEN POR ID
  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrderById/${id}`);
  }

  // CREAR ORDEN

  // ACTUALIZAR STATUS DE LA ORDEN

  // ELIMINAR ORDEN
}
