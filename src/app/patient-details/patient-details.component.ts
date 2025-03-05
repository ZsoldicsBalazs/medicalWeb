import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../domain/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {
  // patient: Patient | undefined ;
  // patientId: number | null=null;
  // errorMessage: string = '';

  // patient2: Patient ={
  //   id: 123123,
  //   CNP: '12312312',
  //   email: '12312312',
  //   phone: '12312312',
  //   firstName: '123123',
  //   lastName: '123123'
  // }

  // constructor(private fb: FormBuilder, private patientService: PatientService, private route: ActivatedRoute){

  // }


  // ngOnInit(): void {
  //   console.log(this.patient2 + ' -> was loaded')
  //   this.patientId = Number(this.route.snapshot.paramMap.get('id'));
  //   this.patientService.getPatientById(this.patientId).subscribe(
  //     (patient: Patient) => this.patient = patient,
  //     (error) => this.errorMessage = <any>error
  //   );
  // }

  patientForm!: FormGroup;
  patient!: Patient;
  loading: boolean = true;
  errorMessage: string = '';
  isMyProfile: boolean = false;

  constructor(private fb: FormBuilder, private patientService: PatientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Exemplu: folosim un CNP prestabilit, dar în practică acesta poate proveni din autentificare sau din URL.
    this.route.paramMap.subscribe( params=> {
      const idParam = params.get('id');
      if(idParam){
        const patientId=+idParam;
        this.loadPatientDetails(patientId);
      }else{
        this.isMyProfile=true;
        this.loadMyProfile();
      }
    })

    // this.patientService.getPatientById(id).subscribe(
    //   (data: Patient) => {
    //     this.patient = data;
    //     this.initializeForm();
    //     this.loading = false;
    //   },
    //   error => {
    //     console.error('Eroare la preluarea datelor pacientului', error);
    //     this.errorMessage = 'Nu s-au putut încărca detaliile pacientului.';
    //     this.loading = false;
    //   }
    // );
  }
  loadMyProfile() {
    this.patientService.getMyProfile().subscribe(
      (data: Patient) => {
        this.patient = data;
        this.initializeForm();
        this.loading=false;
      },
      error => {
        console.error('Eroare la preluarea datelor pacientului', error);
        this.errorMessage = 'Nu s-au putut încărca detaliile pacientului.';
        this.loading = false;
      }
    )
  }
  loadPatientDetails(patientId: number) {
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
        id: 188
      };

      this.patientService.updatePatient(updatedPatient).subscribe(
        response => {
          this.patient = response;
          this.initializeForm();
          console.log(response);
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

}
