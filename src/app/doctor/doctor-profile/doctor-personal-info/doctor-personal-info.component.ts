import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../domain/doctor.model';
import { AuthService } from '../../../services/auth-service.service';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-personal-info',
  templateUrl: './doctor-personal-info.component.html',
  styleUrl: './doctor-personal-info.component.css'
})
export class DoctorPersonalInfoComponent implements OnInit {

 drprofile!: Doctor;
  profileID!: string | null ;
  editMode: boolean= false;
  errorMsg: string[] =[];

  constructor(private authService: AuthService, private doctorService: DoctorService){}

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
      
    });
  }

}
