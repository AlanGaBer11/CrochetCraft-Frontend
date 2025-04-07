import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  // OBTENER TODOS LOS USUARIOS
  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/getUsers`);
  }

  // OBTENER USUARIO POR ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/getUserById/${id}`);
  }

  // CREAR UN USUARIO
  createUser(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/createUser`, data);
  }

  // ACTUALIZAR UN USUARIO
  updateUser(id: string, data: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/user/updateUser/${id}`, data);
  }

  // ELIMINAR UN USUARIO
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/user/deleteUser/${id}`);
  }
}
