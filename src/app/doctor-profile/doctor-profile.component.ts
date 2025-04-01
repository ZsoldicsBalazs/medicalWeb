import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { AuthService } from '../services/auth-service.service';
import { Doctor } from '../domain/doctor.model';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css'
})
export class DoctorProfileComponent implements OnInit {
  
  drprofile!: Doctor;
  profileID!: string | null ;
  editMode: boolean= false;
  errorMsg: string[] =[];

constructor(private doctorService: DoctorService, private authService: AuthService){}

  ngOnInit(): void {
    let profileObj = this.authService.getProfileDetails();
    let obj =JSON.parse(profileObj ?? '{}');
    this.drprofile=obj as Doctor;
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveDoctor(): void {
    this.doctorService.updateDoctor(this.drprofile).subscribe((updatedDoctor) => {
      this.drprofile = updatedDoctor;
      this.authService.setProfileToLocalStorage(updatedDoctor);
      this.editMode = false; 
      console.log("doctor saved" + JSON.stringify(updatedDoctor))
    }, error => {
      this.errorMsg=error.error.message;
      console.log(error);
    });
  }

}
