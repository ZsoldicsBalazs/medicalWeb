import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../domain/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserAppointment } from '../domain/user-appointment.model';

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
  userId: string | null = null;
  isMyProfile: boolean = false;


  constructor(private fb: FormBuilder, private patientService: PatientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');

      if (!this.patient && this.userId) {
        // Dacă userData nu a fost pasat ca Input, înseamnă că trebuie să luăm user-ul din API
        this.loadPatientDetails(this.userId);
      }

      // Verificăm dacă este profilul propriu (ex: '/my-profile')
      this.isMyProfile = !this.userId;
    });
  }

  loadPatientDetails(patientId: string) {
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
  initializeForm(): void {
    this.patientForm = this.fb.group({
      CNP: [this.patient.CNP, Validators.required],
      email: [{ value: this.patient.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [this.patient.phone, Validators.required],
      firstName: [this.patient.firstName, Validators.required],
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
          this.errorMessage="Pacient salvat"
        },
        (error: HttpErrorResponse) => {
          console.error('Eroare la actualizarea datelor pacientului', error);
          console.log(error.error?.message['error']);
          this.errorMessage=error.error?.message;
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
