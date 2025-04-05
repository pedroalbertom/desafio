import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../models/models.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentManagementDialogComponent } from '../../shared/modals/student-management-dialog/student-management-dialog.component';


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
    private dialog: MatDialog
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
  
}
