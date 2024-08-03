// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }

  authenticate(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, request);
  }
}
