// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  // Listar todos os usuários
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // Buscar um usuário específico
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  // Criar novo usuário
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  // Atualizar um usuário existente
  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user);
  }

  // Deletar um usuário
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  // Busca usuários sem cursos associados
  getUsersWithoutCourses(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users/without-courses');
  }
  
}
