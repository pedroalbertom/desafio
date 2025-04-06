// src/app/shared/modaladmin-management-dialoadmin-management-dialog.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Admin } from '../../models/models.model';
import { RegisterAdminDialogComponent } from '../register-admin-dialog/register-admin-dialog.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-management-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './admin-management-dialog.component.html',
  styleUrls: ['./admin-management-dialog.component.css']
})
export class AdminManagementDialogComponent implements OnInit {
  private adminService = inject(AdminService);
  private dialogRef = inject(MatDialogRef<AdminManagementDialogComponent>);
  private dialog = inject(MatDialog);

  displayedColumns = ['name', 'email', 'actions'];
  admins: Admin[] = [];

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (res) => (this.admins = res),
      error: (err) => console.error('Erro ao buscar admins:', err)
    });
  }

  openAddAdminForm() {
    const dialogRef = this.dialog.open(RegisterAdminDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAdmins();
      }
    });
  }

  editAdmin(admin: Admin) {
    const dialogRef = this.dialog.open(RegisterAdminDialogComponent, {
      data: admin
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAdmins();
      }
    });
  }

  deleteAdmin(admin: Admin) {
    if (confirm(`Tem certeza que deseja remover ${admin.name}?`)) {
      this.adminService.deleteAdmin(admin.adminId).subscribe({
        next: () => this.loadAdmins(),
        error: (err) => console.error('Erro ao deletar aluno:', err)
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
