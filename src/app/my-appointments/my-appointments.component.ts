import { Component, OnInit } from '@angular/core';
import { UserAppointment } from '../domain/appointment.model';
import { PatientService } from '../services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit{
  appointments: UserAppointment[] = [];
  displayedColumns: string[] = ['doctor', 'department', 'date', 'time', 'status', 'actions'];

  constructor(private patientService: PatientService){}
  ngOnInit(): void {
    this.patientService.getAppointments(233).subscribe( //TODO CHANGE 233 ID TO DINAMIC FETCH FROM ID !!!
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

  deleteAppointment(id: number){
    this.patientService.deleteAppointment(id).subscribe(
      () => {
        console.log(`Appointment with ID ${id} deleted successfully.`);
        alert("APPOINTMENT DELETED");
      }
    )
  }

 



}
