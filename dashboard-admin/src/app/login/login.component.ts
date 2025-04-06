import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, 
    MatButtonModule,
    MatCardModule
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  loginErrorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (admin) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        this.loginErrorMessage = 'E-mail ou senha inválidos.';
      }
    });
  }
}
