import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://localhost:3000/api/user';

  constructor(private readonly http: HttpClient) {}

  // OBTENER TODOS LOS USUARIOS
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUsers`);
  }

  // OBTENER USUARIO POR ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUserById/${id}`);
  }

  // CREAR UN USUARIO
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUser`, data);
  }

  // ACTUALIZAR UN USUARIO
  updateUser(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/updateUser/${id}`, data);
  }

  // ELIMINAR UN USUARIO
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteUser/${id}`);
  }
}
