import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {


  constructor(private authService: AuthService, private router: Router){
  
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  goToPatientDetails(){
    var id = 233;
    this.router.navigate([`dashboard/patient/aboutMe/${id}`])
  }
}
