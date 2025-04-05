// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../models/course.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://localhost:8080/admins';

  constructor(private http: HttpClient) {}

  // Listar todos os admins
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  // Buscar admin por ID
  getAdminById(adminId: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${adminId}`);
  }

  // Criar novo admin
  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  // Atualizar admin
  updateAdmin(adminId: string, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/${adminId}`, admin);
  }

  // Deletar admin
  deleteAdmin(adminId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${adminId}`);
  }
}
