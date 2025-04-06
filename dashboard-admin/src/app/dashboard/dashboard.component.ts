import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from '../models/models.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentManagementDialogComponent } from '../modals/student-management-dialog/student-management-dialog.component';
import { Router } from '@angular/router';
import { AdminManagementDialogComponent } from '../modals/admin-management-dialog/admin-management-dialog.component';
import { CourseManagementDialogComponent } from '../modals/course-management-dialog/course-management-dialog.component';
import { RegisterCourseDialogComponent } from '../modals/register-course-dialog/register-course-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminName = '';
  adminEmail = '';
  courses: Course[] = [];

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    const admin = this.authService.getAdmin();
    if (admin) {
      this.adminName = admin.name;
      this.adminEmail = admin.email;
    }

    this.courseService.getCourses().subscribe({
      next: (res: any) => this.courses = res,
      error: (err: any) => console.error('Erro ao carregar cursos:', err)
    });
  }

  openStudentManagementModal() {
    this.dialog.open(StudentManagementDialogComponent, {
      width: '700px',
      height: '80vh'
    });
  }

  openAdminManagementModal() {
    this.dialog.open(AdminManagementDialogComponent, {
      width: '700px',
      height: '80vh'
    });
  }

  openCourseManagementModal(course: Course) {
    this.dialog.open(CourseManagementDialogComponent, {
      width: '700px',
      height: '80vh',
      data: { course }
    });
  }

  openRegisterCourseModal(course?: Course) {
    this.dialog.open(RegisterCourseDialogComponent, {
      width: '500px',
      height: '50vh',
      data: course || null
    });
  }
  
  

  logoutButton() {
    if (confirm(`Tem certeza que deseja sair?`)) {
      this.router.navigate(['/logout']);
    }
  }
}
