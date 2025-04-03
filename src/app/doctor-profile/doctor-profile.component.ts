import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { AuthService } from '../services/auth-service.service';
import { Doctor } from '../domain/doctor.model';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent  {
  
constructor(private doctorService: DoctorService, private authService: AuthService){}

  

}
