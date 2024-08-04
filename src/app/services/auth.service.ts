import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import  { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private userId: number | null = null;
  private username: string | null = null;
  private role: string[] | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { username, password }).pipe(
      tap(response => {
        this.saveToken(response.token);
        // Extract user ID from token if available
        this.userId = this.decodeToken(response.token).idUser || null;
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    const decodedToken: any = this.decodeToken(token);
    this.username = decodedToken.sub;
    this.role = decodedToken.roles;
    this.userId = decodedToken.idUser || null; // Extract user ID if available
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getUsername(): string | null {
    if (!this.username) {
      const token = this.getToken();
      if (token) {
        this.username = this.decodeToken(token).sub;
      }
    }
    return this.username;
  }

  getUserId(): number | null {
    if (!this.userId) {
      const token = this.getToken();
      if (token) {
        this.userId = this.decodeToken(token).idUser || null;
      }
    }
    return this.userId;
  }

  getRole(): string | null {
    if (!this.role) {
      const token = this.getToken();
      if (token) {
        this.role = this.decodeToken(token).roles || [];
      }
    }
    return Array.isArray(this.role) && this.role.length > 0 ? this.role[0] : null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.username = null;
    this.role = null;
    this.userId = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
