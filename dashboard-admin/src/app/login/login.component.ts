import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response.model';


@Component({
  selector: 'app-login',
  imports:[
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router  
  ) {}

  onSubmit() {
    const payload = {
      email: this.email,
      password: this.password
    };
  
    this.http.post<LoginResponse>('http://localhost:8080/admins/login', payload)
      .subscribe({
        next: (res) => {
          localStorage.setItem('admin', JSON.stringify(res.admin));
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.error('Erro no login:', err);
        }
      });
  }
  
}

