import { Component, OnInit } from '@angular/core';
import { UserAppointment } from '../../domain/user-appointment.model';
import { PatientService } from '../../services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent implements OnInit{
  appointments: UserAppointment[] = [];
  displayedColumns: string[] = ['doctor', 'department', 'date', 'time', 'status', 'actions'];

  constructor(private patientService: PatientService,
    private authenticationService: AuthService,
    private appointmentService: AppointmentService
  ){}
  ngOnInit(): void {
    this.appointmentService.getAppointments(Number.parseInt(this.authenticationService.getProfileId()!)).subscribe( //TODO CHANGE 233 ID TO DINAMIC FETCH FROM ID !!!
          response => {
            this.loadAppointments(response);
            // this.appointments=response;
            console.log("Aici sunt appointments: ");
            console.log(response);
    
          },
          (error: HttpErrorResponse) => {
            console.log(error.error?.message['error']);
          }
        )
  }

  loadAppointments(newList:UserAppointment[]){
    this.appointments=newList;
  }

  deleteAppointment(apt: UserAppointment){
    this.appointmentService.deleteAppointment(apt.id).subscribe(
      () => {
        console.log(`Appointment with ID ${apt.id} cancelled successfully.`);
        apt.status="CANCELLED";
        this.appointments = [...this.appointments];
        alert("APPOINTMENT CANCELLED");
      },
      (error) => {
        console.log(error);
        alert("Failed to cancel appointment. Please try again")
      }
    )
  }

 



}
