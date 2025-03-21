import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private readonly http: HttpClient) {}

  // MÉTODO GET
  public get(url: string) {
    return this.http.get(url);
  }

  // MÉTODO POST
  public post(url: string, data: any) {
    return this.http.post(url, data);
  }

  // MÉTODO PATCH
  public patch(url: string, data: any, options?: any) {
    const elemento = `${url}`;
    return this.http.patch(elemento, data, options);
  }

  // MÉTODO DELETE
  public delete(url: string) {
    return this.http.delete(url);
  }
}
