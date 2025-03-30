import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Patient } from '../../domain/patient.model';
import { MenuItem } from '../../domain/menu-item.model';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {

  patient!: Patient;
  menuItems: MenuItem[]=[];

  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    const profile = localStorage.getItem('userProfile')!;
    this.patient = JSON.parse(profile);
    this.menuItems = [
      { label: 'Home', icon: 'fas fa-house me-1', route: 'home' },
      { label: 'MyAppointments', icon: 'fas fa-notes-medical me-1', route: 'myAppointments' },
      {label: 'Profile', icon: 'fas fa-user me-1', route: `aboutMe/${this.patient.id}`}
    ]

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
  goToPatientDetails(){
    var id = this.patient.id;
    this.router.navigate([`dashboard/patient/aboutMe/${id}`])
  }
}
