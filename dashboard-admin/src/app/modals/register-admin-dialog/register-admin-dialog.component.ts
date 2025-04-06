import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/admin.model';

@Component({
  selector: 'app-register-admin-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, 
    MatButtonModule
  ],
  templateUrl: './register-admin-dialog.component.html',
  styleUrls: ['./register-admin-dialog.component.css']
})
export class RegisterAdminDialogComponent {
  private adminService = inject(AdminService);
  private dialogRef = inject(MatDialogRef<RegisterAdminDialogComponent>);

  admin: Admin = {
    adminId: '',
    name: '',
    email: '',
    password: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Admin | null) {
    if (data) {
      this.admin = { ...data };
    }
  }

  register() {
    if (!this.admin.name || !this.admin.email || !this.admin.password) {
      alert('Preencha todos os campos!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.admin.email)) {
      alert('E-mail inválido');
      return;
    }

    this.adminService.createAdmin(this.admin).subscribe({
      next: (res) => {
        console.log('Admin criado:', res);
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Erro ao criar admin:', err)
    });
    
  }

  cancelar() {
    this.dialogRef.close();
  }
}
