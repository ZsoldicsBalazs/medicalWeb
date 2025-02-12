import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {
  // userRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // const token = this.authService.getToken();
    // if (token) {
    //   // Decodificăm payload-ul JWT pentru a extrage rolul
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   // Se presupune că în payload se află o proprietate "role"
    //   this.userRole = payload.role;
    // }
  }

  logout(): void {
    this.authService.logout();
  }
}
