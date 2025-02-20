import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../domain/patient.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {

  patient: Patient | undefined ;
  patientId: number | null=null;
  errorMessage: string = '';

  patient2: Patient ={
    id: 123123,
    CNP: '12312312',
    email: '12312312',
    phone: '12312312',
    firstName: '123123',
    lastName: '123123'
  }

  constructor(private patientService: PatientService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatientById(this.patientId).subscribe(
      (patient: Patient) => this.patient = patient,
      (error) => this.errorMessage = <any>error
    );
  }

}
