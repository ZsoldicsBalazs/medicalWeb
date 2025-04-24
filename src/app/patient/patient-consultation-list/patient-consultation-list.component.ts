import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../domain/patient.model';
import { PatientService } from '../../services/patient.service';
import { UserAppointment } from '../../domain/user-appointment.model';

@Component({
  selector: 'app-patient-consultation-list',
  templateUrl: './patient-consultation-list.component.html',
  styleUrl: './patient-consultation-list.component.css'
})
export class PatientConsultationListComponent implements OnInit {
 

constructor (private patientService: PatientService){

}

  @Input() patientId!: number;
  userAppointments: UserAppointment[] | undefined;

  ngOnInit(): void {
    console.log("Patient ID received " + this.patientId)
  this.patientService.getCompletedAppointments(this.patientId).subscribe(
    data=> {
        this.userAppointments=data;
        console.log(data);
    }
  )
  }





}
