import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnrollStudentDialogComponent } from '../enroll-student-dialog/enroll-student-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterCourseDialogComponent } from '../register-course-dialog/register-course-dialog.component';
import { Router } from '@angular/router';

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
    private dialog: MatDialog,
    private router: Router // ✅ Adicionado o Router
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

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(RegisterCourseDialogComponent, {
      data: course
    });

    dialogRef.afterClosed().subscribe((result: Course | null) => {
      if (result) {
        this.courseService.updateCourse(course.courseId, result).subscribe({
          next: () => {
            this.snackBar.open('Curso atualizado com sucesso!', 'Fechar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Erro ao atualizar curso:', err);
            this.snackBar.open('Erro ao atualizar curso.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteCourse(course: Course) {
    if (confirm(`Tem certeza que deseja remover ${course.name}?`)) {
      this.courseService.deleteCourse(course.courseId).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url + "/dashboard"]);
          });
        },
        error: (err) => console.error('Erro ao deletar curso:', err)
      });
    }
  }

  openStudentEnrollDialog(): void {
    this.dialog.open(EnrollStudentDialogComponent, {
      data: { courseId: this.course.courseId }
    });
  }
}
