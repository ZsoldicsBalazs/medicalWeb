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
  // userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
  }
}
