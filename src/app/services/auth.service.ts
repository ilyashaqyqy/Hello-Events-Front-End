

// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register';
import { jwtDecode } from 'jwt-decode'; // Import the default export from jwt-decode

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private username: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}


  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password });
  }

  saveToken(token: string): void {
    console.log('Saving token:', token);
    localStorage.setItem('authToken', token);
    this.decodeToken(token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  decodeToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    this.username = decodedToken.sub;
  }

  getUsername(): string | null {
    if (!this.username) {
      const token = this.getToken();
      if (token) {
        this.decodeToken(token);
      }
    }
    return this.username;
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken');
    this.username = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}





























// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { RegisterRequest } from '../models/register';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private apiUrl = 'http://localhost:8080/api/v1/auth';

//   constructor(private http: HttpClient) { }

//   register(request: RegisterRequest): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, request);
//   }

//   authenticate(request: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/authenticate`, request);
//   }
// }
