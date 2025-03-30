import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit {
  
  drprofile: any| null;
  profileID!: string | null ;

constructor(private doctorService: DoctorService, private authService: AuthService){}

  ngOnInit(): void {
    this.profileID=this.authService.getProfileId();
    this.drprofile=this.doctorService.getDrById(this.profileID!).subscribe(
      (data) => {
        this.drprofile=data;
        console.log(this.drprofile);
      }

    )
  }

}
