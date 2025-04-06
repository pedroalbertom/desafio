import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-student-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, 
    MatButtonModule
  ],
  templateUrl: './register-student-dialog.component.html',
  styleUrls: ['./register-student-dialog.component.css']
})
export class RegisterStudentDialogComponent {
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<RegisterStudentDialogComponent>);

  student: User = {
    userId: '',
    name: '',
    email: '',
    courseId: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: User | null) {
    if (data) {
      this.student = { ...data };
    }
  }

  register() {
    if (!this.student.name || !this.student.email) {
      alert('Preencha nome e e-mail');
      return;
    }

    if (this.student.userId) {
      // Edição
      this.userService.updateUser(this.student.userId, this.student).subscribe({
        next: (res) => {
          console.log('Aluno atualizado:', res);
          this.dialogRef.close(true);
        },
        error: (err) => console.error('Erro ao atualizar aluno:', err)
      });
    } else {
      // Criação
      this.userService.createUser(this.student).subscribe({
        next: (res) => {
          console.log('Aluno criado:', res);
          this.dialogRef.close(true);
        },
        error: (err) => console.error('Erro ao criar aluno:', err)
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
