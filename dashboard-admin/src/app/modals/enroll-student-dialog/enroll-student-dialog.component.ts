import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/models.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-enroll-student-dialog',
  standalone: true,
  templateUrl: './enroll-student-dialog.component.html',
  styleUrls: ['./enroll-student-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, 
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
  ]
})
export class EnrollStudentDialogComponent implements OnInit {
  private userService = inject(UserService);
  private courseService = inject(CourseService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<EnrollStudentDialogComponent>);
  @Inject(MAT_DIALOG_DATA) public data!: { courseId: string };

  students: User[] = [];

  ngOnInit(): void {
    this.userService.getUsersWithoutCourses().subscribe({
      next: (res) => this.students = res,
      error: (err) => {
        console.error('Erro ao buscar alunos disponíveis:', err);
        this.snackBar.open('Erro ao carregar alunos.', 'Fechar', { duration: 3000 });
      }
    });
  }

  enrollStudent(student: User) {
    this.courseService.assignCourseToUser(student.userId, this.data.courseId).subscribe({
      next: () => {
        this.snackBar.open('Aluno matriculado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao matricular aluno:', err);
        this.snackBar.open('Erro ao matricular aluno.', 'Fechar', { duration: 3000 });
      }
    });
  }
}
