import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../services/course.service';
import { Course, User } from '../../models/models.model';

@Component({
  selector: 'app-register-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, 
    MatButtonModule
  ],
  templateUrl: './register-course-dialog.component.html',
  styleUrls: ['./register-course-dialog.component.css']
})
export class RegisterCourseDialogComponent {
  private courseService = inject(CourseService);
  private dialogRef = inject(MatDialogRef<RegisterCourseDialogComponent>);

  course: Course = {
    courseId: '',
    name: '',
    description: '',
    durationInHours: 10,
    users: [] as User[]
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Course | null) {
    if (data) {
      this.course = { ...data };
    }
  }

  register() {
    if (
      !this.course.name?.trim() ||
      !this.course.description?.trim() ||
      this.course.durationInHours <= 0
    ) {
      alert('Preencha nome, descrição e duração (maior que 0)!');
      return;
    }
    
    this.courseService.createCourse(this.course).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
        error: (err) => console.error('Erro ao criar curso:', err)
      });
    }

  cancelar() {
    this.dialogRef.close();
  }
}
