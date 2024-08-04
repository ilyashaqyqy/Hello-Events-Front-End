import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private username: string | null = null;
  private role: string[] | null = null;

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
    console.log('Decoded token:', decodedToken);
    this.username = decodedToken.sub;
    this.role = decodedToken.roles; // Note the plural 'roles'
    console.log('Extracted role:', this.role);
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

  getRole(): string | null {
    if (!this.role) {
      const token = this.getToken();
      if (token) {
        this.decodeToken(token);
      }
    }
    return Array.isArray(this.role) && this.role.length > 0 ? this.role[0] : null;
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken');
    this.username = null;
    this.role = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
