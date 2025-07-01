import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  profileID: string | null = null;
  menuItems: any[] = [];

   constructor(private authService: AuthService) {
    }
  ngOnInit(): void {
    this.profileID = this.authService.getProfileId();
    this.menuItems = [
      {label: 'Home', icon: 'fas fa-house me-1', route: 'home'},
      {label: 'Manage News', icon: 'fas fa-newspaper me-1', route: 'news'},
      {label: 'PatientList', icon: 'fas fa-user-group me-1', route: 'patients'},
      {label: 'ConsultationList', icon: 'fas fa-notes-medical me-1', route: 'appointments'},
      {label: 'Profile', icon: 'fas fa-user-md me-1', route: `profile`},
      {label: 'Statistics', icon: 'fa fa-pie-chart', route: 'statistics'},
      {label: 'Users', icon: 'fa fa-users', route: 'users'},
    ];
  }


  
}
