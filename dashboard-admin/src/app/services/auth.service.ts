import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/admins';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('admin', JSON.stringify(res.admin));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAdmin() {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  }
}
