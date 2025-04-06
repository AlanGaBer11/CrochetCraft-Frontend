import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  // OBTENER LOS PRODUCTOS POR CATEGORIA
  getProductsByCategory(categoria: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/product/getProductsByCategory/${categoria}`
    );
  }
}
