import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../domain/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserAppointment } from '../../domain/user-appointment.model';
import { AuthService } from '../../services/auth-service.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {
  patientForm!: FormGroup;
  patient!: Patient;
  loading: boolean = true;
  errorMessage: string = '';
  appointments!: UserAppointment[];
  patientId: string | null=null;
  isMyProfile: boolean = false;


  constructor(private fb: FormBuilder,
     private patientService: PatientService, 
     private route: ActivatedRoute,
     private router: Router,
     private authService: AuthService,
     private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
      // Determine if this is the patient's own profile based on the route
    const currentRoute = this.router.url;
    this.isMyProfile = currentRoute.includes('/dashboard/patient/aboutMe');

    // Get patient ID from route params (for doctor) or localStorage (for patient)
    this.route.paramMap.subscribe(params => {
      const patientIdFromRoute = params.get('id'); // For /dashboard/doctor/patients/:id
      const userIdFromStorage = this.authService.getProfileId(); // From localStorage 'profileID'

      let patientId: string | null = null;

      if (this.isMyProfile) {
        // Patient viewing their own profile
        patientId = userIdFromStorage;
      } else {
        // Doctor viewing a patient's profile
        patientId = patientIdFromRoute;
      }

      console.log('PatientDetails: patientId=', patientId, 'isMyProfile=', this.isMyProfile); // Debug

      if (patientId) {
        this.loadPatientDetails(patientId);
      } else {
        this.errorMessage = 'Patient ID not found.';
        this.loading = false;
      }
    });
  }

  private loadPatientDetails(patientId: string) {
    this.patientService.getPatientById(patientId).subscribe(
      (data: Patient) => {
        this.patient=data;
        this.initializeForm();
        this.loading = false;
        
      },
      error => {
        console.error('Eroare la preluarea datelor pacientului', error);
        this.errorMessage = 'Nu s-au putut încărca detaliile pacientului.';
        this.loading = false;}
    )
  }

  // Inițializăm formularul folosind datele primite de la backend.
  private initializeForm(): void {
    this.patientForm = this.fb.group({
      CNP: [this.patient.CNP, [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      email: [{ value: this.patient.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [this.patient.phone, [Validators.required,Validators.minLength(10), Validators.maxLength(15),Validators.pattern('^\\+?(\\d{1,3})?[ ]?\\d{6,14}$')]],
      firstName: [this.patient.firstName, [Validators.required,Validators.minLength(3)]],
      lastName: [this.patient.lastName, Validators.required]
    });
  }



  // Actualizează datele pacientului la backend
  onSave(): void {
    if (this.patientForm.valid) {
      const updatedPatient: Patient = {
        CNP: this.patientForm.get('CNP')!.value,
        email: this.patient.email, // păstrăm emailul original
        phone: this.patientForm.get('phone')!.value,
        firstName: this.patientForm.get('firstName')!.value,
        lastName: this.patientForm.get('lastName')!.value,
        id: this.patient.id
      };

      this.patientService.updatePatient(updatedPatient).subscribe(
        response => {
          this.patient = response;
          this.initializeForm();
          console.log(response);
          this.notificationService.success("Update patient details", "Patient details updated succesfull");
          this.errorMessage="Pacient salvat"
        },
        (error: HttpErrorResponse) => {
          console.error('Eroare la actualizarea datelor pacientului', error);
          console.log(error.error?.message['error']);
          this.errorMessage=error.error?.message;
          this.notificationService.warning("Something gone bad",error.error?.message)
          // Aici poți afișa un mesaj de eroare pentru utilizator
        }
      );
    }
  }

  getAppointments(){
    this.patientService.getAppointments(this.patient.id).subscribe(
      response => {
        this.appointments=response;
        console.log("Aici sunt appointments: ");
        console.log(response);

      },
      (error: HttpErrorResponse) => {
        console.log(error.error?.message['error']);
      }
    )
  }

  onTabChanged(event: MatTabChangeEvent){
    console.log("Tab Index: ", event.index)
    switch(event.index){
      case 0: 
        console.log("personal details clicked");
        break;
      case 1:
        console.log("consultation clicked");  
        break;
      case 2:
        console.log("analize clicked");
        break;
      case 3: 
        break;    
    }

  }

}
