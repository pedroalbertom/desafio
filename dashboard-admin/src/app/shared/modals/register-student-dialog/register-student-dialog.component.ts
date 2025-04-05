import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
})
export class RegisterStudentDialogComponent {
  student = { name: '', email: '' };

  constructor(private dialogRef: MatDialogRef<RegisterStudentDialogComponent>) {}

  register() {
    // Aqui você chamaria um serviço pra enviar o aluno à API
    console.log('Aluno registrado:', this.student);
    this.dialogRef.close(this.student);
  }
}
