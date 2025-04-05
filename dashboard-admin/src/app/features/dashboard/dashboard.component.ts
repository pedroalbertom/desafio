import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service'; // ajuste o path se necessário

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminName = '';
  adminEmail = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const admin = this.authService.getAdmin();

    if (admin) {
      this.adminName = admin.name;
      this.adminEmail = admin.email;
    }
  }
}
