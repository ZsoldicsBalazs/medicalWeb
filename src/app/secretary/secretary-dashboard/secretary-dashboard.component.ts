import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-secretary-dashboard',
  templateUrl: './secretary-dashboard.component.html',
  styleUrls: ['./secretary-dashboard.component.css'],
})
export class SecretaryDashboardComponent implements OnInit {
  profileID: string | null = null;
  menuItems: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.profileID = this.authService.getProfileId();
    this.menuItems = [
      { label: 'Home', icon: 'fas fa-house me-1', route: 'home' },
      { label: 'News', icon: 'fas fa-newspaper me-1', route: 'newsboard' },
      {
        label: 'Manage Appointments',
        icon: 'fas fa-calendar-check me-1',
        route: 'manage-appointments',
      },
      { label: 'Patients', icon: 'fas fa-user-group me-1', route: 'patients' },
      { label: 'Profile', icon: 'fas fa-user me-1', route: 'profile' },
    ];
  }
}
