import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  // OBTENER TODAS LAS ORDENES
  getOrders(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/order/getOrders`);
  }

  //OBTENER UNA ORDEN POR ID
  getOrderById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/order/getOrderById/${id}`);
  }

  // CREAR ORDEN

  // ACTUALIZAR STATUS DE LA ORDEN

  // ELIMINAR ORDEN
}
