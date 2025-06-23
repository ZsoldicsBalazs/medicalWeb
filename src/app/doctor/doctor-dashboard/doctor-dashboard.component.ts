import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { SidenavComponent } from '../../common/sidenav/sidenav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {
  profileID: string | null = null;
  menuItems: any[] = [];

  
  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.profileID = this.authService.getProfileId();
    this.menuItems = [
      {label: 'Home', icon: 'fas fa-house me-1', route: 'home'},
      {label: 'News', icon: 'fas fa-newspaper me-1', route: 'newsboard'},
      {label: 'PatientList', icon: 'fas fa-user-group me-1', route: 'patients'},
      {label: 'ConsultationList', icon: 'fas fa-notes-medical me-1', route: 'appointments'},
      {label: 'Profile', icon: 'fas fa-user-md me-1', route: `profile`},
      {label: 'Statistics', icon: 'fa fa-pie-chart', route: 'statistics'},
    ]
  


  }

  
  logout(): void {
    this.authService.logout();
  }
}
