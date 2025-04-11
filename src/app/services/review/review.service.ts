import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private readonly http: HttpClient) {}

  // OBTENER TODAS LAS RESEÑAS
  getReviews(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/review/getReviews`);
  }

  // OBTENER RESEÑAS POR ID DE PRODUCTO
  getReviewsByProductId(productId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/review/getReviewsByProductId/${productId}`
    );
  }

  // OBTENER RESEÑAS POR NOMBRE DE PRODUCTO
  getReviewsByProductName(nombreProducto: string): Observable<any> {
    const encodedName = encodeURIComponent(nombreProducto);
    return this.http.get(
      `${environment.apiUrl}/review/getReviewsByProductName/${encodedName}`
    );
  }

  // CREAR RESEÑA
  createReview(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/review/createReview`, data);
  }

  // ACTUALIZAR RESEÑA
  updateReview(id: string, data: any): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}/review/updateReview/${id}`,
      data
    );
  }

  // ELIMINAR RESEÑA
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/review/deleteReview/${id}`);
  }
}
