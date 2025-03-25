import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'https://localhost:3000/api/product';

  constructor(private readonly http: HttpClient) {}

  // OBTENER TODOS LOS PRODUCTOS
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProducts`);
  }

  // OBTENER PRODUCTO POR ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProductById/${id}`);
  }

  // OBTENER LOS PRODUCTOS POR CATEGORIA
  getProductsByCategory(categoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProductsByCategory/${categoria}`);
  }

  // CREAR UN PRODUCTO
  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createProduct`, data);
  }

  // ACTUALIZAR UN PRODUCTO
  updateProduct(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/updateProduct/${id}`, data);
  }

  // ELIMINAR UN PRODUCTO
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteProduct/${id}`);
  }
}
