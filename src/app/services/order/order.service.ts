import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  // Crear una nueva orden
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/order/createOrder`, orderData);
  }

  // Obtener órdenes del usuario
  getOrders(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/order/getOrders`);
  }
}
