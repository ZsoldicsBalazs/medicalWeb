import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { DoctorAppointment } from '../../domain/doctor-appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css'],
  providers: [MessageService],
})
export class DoctorAppointmentsComponent implements OnInit {
  appointments: DoctorAppointment[] = [];

  searchCNP: string = '';
  lastName: string = '';
  searchFirstName: string = '';
  searchDate: Date | null = null; // Changed to Date for p-calendar
  errorMsg: string = '';
  notFound: boolean = false;

  constructor(
    private drService: DoctorService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.onSearch(); // Load initial data without pre-filled date
  }

  onSearch() {
    const searchParams = {
      cnp: this.searchCNP,
      patientLastName: this.lastName,
      patientFirstName: this.searchFirstName,
      appointmentDate: this.searchDate
        ? this.formatDate(this.searchDate)
        : null,
    };

    this.appointmentService.searchAppointments(searchParams).subscribe(
      (data) => {
        if (data.length === 0) {
          this.notFound = true;
          this.errorMsg = 'Nu s-a găsit consultații';
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: this.errorMsg,
          });
        } else {
          this.notFound = false;
          this.appointments = data;
        }
      },
      (error) => {
        this.notFound = true;
        this.errorMsg = error.error.message || 'Eroare la căutare';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMsg,
        });
        console.log(error);
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getSeverity(
    status: string | null | undefined
  ): 'success' | 'info' | 'warning' | 'danger' | null {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'SCHEDULED':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'info';
    }
  }

  goToConsultation(appointmentId: number) {
    const fullUrl = this.router.url;
    const segments = fullUrl.split('/');
    const role = segments[2];
    if (role) {
      this.router.navigate([`/dashboard/${role}/consultation`, appointmentId]);
    } else {
      console.error('Role not found in URL!');
    }
  }
}
