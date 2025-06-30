import { Component, OnInit } from '@angular/core';
import { UserAppointment } from '../../domain/user-appointment.model';
import { PatientService } from '../../services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth-service.service';
import { AppointmentService } from '../../services/appointment.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css',
})
export class MyAppointmentsComponent implements OnInit {
  appointments: UserAppointment[] = [];

  constructor(
    private authenticationService: AuthService,
    private appointmentService: AppointmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.appointmentService
      .getAppointments(
        Number.parseInt(this.authenticationService.getProfileId()!)
      )
      .subscribe(
        //TODO CHANGE 233 ID TO DINAMIC FETCH FROM ID !!!
        (response) => {
          this.appointments = response.sort((a, b) => {
            return (
              new Date(a.appointmentDate).getTime() -
              new Date(b.appointmentDate).getTime()
            );
          });
          console.log('Aici sunt appointments: ');
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.log(error.error?.message['error']);
        }
      );
  }

  deleteAppointment(apt: UserAppointment) {
    this.appointmentService.deleteAppointment(apt.id).subscribe(
      () => {
        apt.status = 'CANCELLED';
        this.appointments = [...this.appointments]; // trigger change detection
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Appointment cancelled.',
        });
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to cancel appointment.',
        });
      }
    );
  }

  confirmDelete(appointment: UserAppointment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this appointment?',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.deleteAppointment(appointment);
      },
    });
  }
}
