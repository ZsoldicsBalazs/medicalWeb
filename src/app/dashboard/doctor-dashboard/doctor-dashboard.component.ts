import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

  constructor(private authService: AuthService, private router: Router) {}

  menuItems = [
    {label: 'Home', icon: 'fas fa-house me-1', route: 'home'},
    {label: 'News', icon: 'fas fa-newspaper me-1', route: '/newsboard'},
    {label: 'PatientList', icon: 'fas fa-user-group me-1', route: 'patients'},
    {label: 'ConsultationList', icon: 'fas fa-notes-medical me-1', route: 'appointments'},
    {label: 'Profile', icon: 'fas fa-user me-1', route: '/profile'}
  ]

  logout(): void {
    this.authService.logout();
  }
}
