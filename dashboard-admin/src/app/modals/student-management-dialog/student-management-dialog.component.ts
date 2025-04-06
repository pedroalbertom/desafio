// src/app/shared/modals/student-management-dialog/student-management-dialog.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { UserService } from '../../services/user.service';
import { User } from '../../models/models.model';
import { RegisterStudentDialogComponent } from '../register-student-dialog/register-student-dialog.component';

@Component({
  selector: 'app-student-management-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './student-management-dialog.component.html',
  styleUrls: ['./student-management-dialog.component.css']
})
export class StudentManagementDialogComponent implements OnInit {
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<StudentManagementDialogComponent>);
  private dialog = inject(MatDialog);

  displayedColumns = ['name', 'email', 'actions'];
  students: User[] = [];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.userService.getUsers().subscribe({
      next: (res) => (this.students = res),
      error: (err) => console.error('Erro ao buscar alunos:', err)
    });
  }

  openAddStudentForm() {
    const dialogRef = this.dialog.open(RegisterStudentDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadStudents(); // Atualiza lista após cadastrar
      }
    });
  }

  editStudent(student: User) {
    const dialogRef = this.dialog.open(RegisterStudentDialogComponent, {
      data: student
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  deleteStudent(student: User) {
    if (confirm(`Tem certeza que deseja remover ${student.name}?`)) {
      this.userService.deleteUser(student.userId).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error('Erro ao deletar aluno:', err)
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
