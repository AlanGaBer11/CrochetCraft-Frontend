import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly apiUrl = 'http://localhost:3000/api/review';

  constructor(private readonly http: HttpClient) {}

  // OBTEBNER TODAS LAS RESEÑAS
  getReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getReviews`);
  }

  // OBTENER RESEÑA POR ID
  getReviewById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getReviewById/${id}`);
  }

  // CREAR RESEÑA
  createReview(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createReview`, data);
  }

  // ACTUALIZAR RESENIA
  updateReview(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/updateReview/${id}`, data);
  }

  // ELIMINAR RESEÑA
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteReview/${id}`);
  }
}
