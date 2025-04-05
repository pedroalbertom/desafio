import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-student-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-student-modal.component.html'
})
export class RegisterStudentModalComponent {
  studentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegisterStudentModalComponent>,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  register() {
    if (this.studentForm.valid) {
      this.http.post('http://localhost:8080/users/', this.studentForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Erro ao registrar aluno:', err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
