import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/models.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = 'http://localhost:8080/courses';

  constructor(private http: HttpClient) {}

  // Lista todos os cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  // Busca um curso por ID
  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${courseId}`);
  }

  // Cria um novo curso
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  // Atualiza um curso existente
  updateCourse(courseId: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${courseId}`, course);
  }

  // Remove um curso
  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${courseId}`);
  }
}
