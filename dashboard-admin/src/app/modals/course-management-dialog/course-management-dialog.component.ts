import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Course } from '../../models/models.model';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/models.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnrollStudentDialogComponent } from '../enroll-student-dialog/enroll-student-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-course-management-dialog',
  templateUrl: './course-management-dialog.component.html',
  styleUrls: ['./course-management-dialog.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ],
})
export class CourseManagementDialogComponent {
  course: Course;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { course: Course },
    private dialogRef: MatDialogRef<CourseManagementDialogComponent>,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.course = data.course;
  }

  removeStudent(student: User): void {
    this.courseService.unassignCourseFromUser(student.userId).subscribe({
      next: () => {
        this.course.users = this.course.users.filter(u => u.userId !== student.userId);
        this.snackBar.open('Aluno removido com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: (err) => {
        console.error('Erro ao remover aluno:', err);
        this.snackBar.open('Erro ao remover aluno.', 'Fechar', { duration: 3000 });
      }
    });
  }
  

  openStudentEnrollDialog(): void {
    this.dialog.open(EnrollStudentDialogComponent, {
      data: { courseId: this.course.courseId }
    });
  }
}
