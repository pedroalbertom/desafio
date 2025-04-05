import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    const adminData = localStorage.getItem('admin');

    if (adminData) {
      const admin = JSON.parse(adminData);
      this.adminName = admin.name;
      this.adminEmail = admin.email;
    }
  }
}
