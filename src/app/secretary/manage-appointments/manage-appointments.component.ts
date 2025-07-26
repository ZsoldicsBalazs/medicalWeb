import { Component, OnInit } from '@angular/core';
import { SecretaryAppointmentService, SecretaryAppointment, AppointmentSearchParams } from '../../services/secretary-appointment.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent implements OnInit {

  appointments: SecretaryAppointment[] = [];
  filteredAppointments: SecretaryAppointment[] = [];
  
  // Search parameters
  searchCNP: string = '';
  searchLastName: string = '';
  searchFirstName: string = '';
  searchDate: Date | null = null;
  searchDoctorName: string = '';
  
  loading: boolean = false;
  
  showTodayOnly: boolean = true;
  
  // Pagination
  first: number = 0;
  rows: number = 10;
  
  constructor(
    private secretaryAppointmentService: SecretaryAppointmentService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadTodayAppointments();
  }

  loadTodayAppointments(): void {
    this.loading = true;
    this.showTodayOnly = true;
    
    this.secretaryAppointmentService.getTodayAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.filteredAppointments = [...appointments];
        this.loading = false;
        
        if (appointments.length === 0) {
          this.notificationService.info('Info', 'No appointments found for today');
        }
      },
      error: (error) => {
        console.error('Error loading today appointments:', error);
        this.loading = false;
        this.notificationService.warning('Error', 'Failed to load appointments');
      }
    });
  }

  loadAllAppointments(): void {
    this.loading = true;
    this.showTodayOnly = false;
    
    this.secretaryAppointmentService.getAllAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.filteredAppointments = [...appointments];
        this.loading = false;
        
        if (appointments.length === 0) {
          this.notificationService.info('Info', 'No appointments found');
        }
      },
      error: (error) => {
        console.error('Error loading all appointments:', error);
        this.loading = false;
        this.notificationService.warning('Error', 'Failed to load appointments');
      }
    });
  }

  onSearch(): void {
    this.loading = true;
    
    const searchParams: AppointmentSearchParams = {
      cnp: this.searchCNP || undefined,
      lastName: this.searchLastName || undefined,
      firstName: this.searchFirstName || undefined,
      appointmentDate: this.searchDate ? this.formatDate(this.searchDate) : undefined,
      doctorName: this.searchDoctorName || undefined
    };

    this.secretaryAppointmentService.searchAppointments(searchParams).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.filteredAppointments = [...appointments];
        this.loading = false;
        this.showTodayOnly = false;
        
        if (appointments.length === 0) {
          this.notificationService.info('Search Results', 'No appointments found matching your criteria');
        } else {
          this.notificationService.success('Search Results', `Found ${appointments.length} appointment(s)`);
        }
      },
      error: (error) => {
        console.error('Error searching appointments:', error);
        this.loading = false;
        this.notificationService.warning('Error', 'Failed to search appointments');
      }
    });
  }

  clearSearch(): void {
    this.searchCNP = '';
    this.searchLastName = '';
    this.searchFirstName = '';
    this.searchDate = null;
    this.searchDoctorName = '';
    
    // Load today's appointments after clearing
    this.loadTodayAppointments();
  }

  refreshAppointments(): void {
    if (this.showTodayOnly) {
      this.loadTodayAppointments();
    } else {
      this.loadAllAppointments();
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDisplayDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('ro-RO', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatTime(timeStr: string): string {
    return timeStr.substring(0, 5); // Remove seconds
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'SCHEDULED': return 'warning';
      case 'CANCELLED': return 'danger';
      default: return 'info';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'Complete';
      case 'SCHEDULED': return 'Scheduled';
      case 'CANCELLED': return 'Cancelled';
      default: return status;
    }
  }

  viewPatientDetails(patientId: number): void {
   
    window.open(`/dashboard/secretary/patients/${patientId}`, '_blank');
    console.log('Navigate to patient details:', patientId);
  }

  viewDoctorSchedule(doctorName: string): void {
    // Navigate to doctor schedule or filter by doctor
    this.searchDoctorName = doctorName;
    this.onSearch();
  }

  openConsultationResult(appointmentId: number): void {
    // Open consultation result PDF for completed appointments
    this.loading = true;
    
    this.secretaryAppointmentService.getConsultationResultPDF(appointmentId).subscribe({
      next: (blob: Blob) => {
        // Create blob URL and open in new tab
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        this.loading = false;
        
        this.notificationService.success('Success', 'Consultation result opened successfully');
      },
      error: (error: any) => {
        console.error('Error opening consultation result:', error);
        this.loading = false;
        
        if (error.status === 404) {
          this.notificationService.warning('Not Found', 'No consultation result found for this appointment');
        } else {
          this.notificationService.warning('Error', 'Failed to open consultation result');
        }
      }
    });
  }

  isAppointmentCompleted(status: string): boolean {
    return status === 'COMPLETED';
  }
} 