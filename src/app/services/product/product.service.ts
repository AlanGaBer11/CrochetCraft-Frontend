import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  // OBTENER TODOS LOS PRODUCTOS
  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/getProducts`);
  }

  // OBTENER PRODUTCO POR ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/getProductById/${id}`);
  }

  // OBTENER LOS PRODUCTOS POR CATEGORIA
  getProductsByCategory(categoria: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/product/getProductsByCategory/${categoria}`
    );
  }

  /* SOLO ADMIN */
  // CREAR PRODUCTO
  createProduct(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/product/createProduct`, data);
  }

  // ACTUALIZAR UN PRODUCTO
  updateProduct(id: string, data: any): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}/product/updateProduct/${id}`,
      data
    );
  }

  // ELIMINAR UN PRODUCTO
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/product/deleteProduct/${id}`
    );
  }
}
