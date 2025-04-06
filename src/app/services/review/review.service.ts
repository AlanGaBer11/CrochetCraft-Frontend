import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private readonly http: HttpClient) {}

  // OBTEBNER TODAS LAS RESEÑAS
  getReviews(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/review/getReviews`);
  }

  // OBTENER RESEÑA POR ID
  getReviewById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/review/getReviewById/${id}`);
  }

  // CREAR RESEÑA
  createReview(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/review/createReview`, data);
  }

  // ACTUALIZAR RESENIA
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
