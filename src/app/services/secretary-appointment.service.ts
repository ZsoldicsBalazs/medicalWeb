import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environment/environment';

export interface SecretaryAppointment {
  id: number;
  patientFirstName: string;
  patientLastName: string;
  patientCNP: string;
  patientId: number;
  doctorFirstName: string;
  doctorLastName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface AppointmentSearchParams {
  cnp?: string;
  lastName?: string;
  firstName?: string;
  appointmentDate?: string;
  doctorName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecretaryAppointmentService {
  
  private apiUrl = `${environment.apiBaseUrl}/secretary`;

  constructor(private http: HttpClient) { }

  /**
   * Search appointments with filters
   */
  searchAppointments(searchParams: AppointmentSearchParams): Observable<SecretaryAppointment[]> {
    let params = new HttpParams();
    
    if (searchParams.cnp) {
      params = params.set('cnp', searchParams.cnp);
    }
    if (searchParams.lastName) {
      params = params.set('lastName', searchParams.lastName);
    }
    if (searchParams.firstName) {
      params = params.set('firstName', searchParams.firstName);
    }
    if (searchParams.appointmentDate) {
      params = params.set('appointmentDate', searchParams.appointmentDate);
    }
    if (searchParams.doctorName) {
      params = params.set('doctorName', searchParams.doctorName);
    }

    return this.http.get<SecretaryAppointment[]>(`${this.apiUrl}/appointments`, { params }).pipe(
      catchError(error => {
        console.error('Error searching appointments:', error);
        return of([]);
      })
    );
  }

  /**
   * Get today's appointments
   */
  getTodayAppointments(): Observable<SecretaryAppointment[]> {
    return this.http.get<SecretaryAppointment[]>(`${this.apiUrl}/appointments/today`).pipe(
      catchError(error => {
        console.error('Error fetching today appointments:', error);
        return of([]);
      })
    );
  }

  /**
   * Get all appointments without filters
   */
  getAllAppointments(): Observable<SecretaryAppointment[]> {
    return this.searchAppointments({});
  }

  /**
   * Get consultation result PDF for completed appointment
   */
  getConsultationResultPDF(appointmentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/appointments/${appointmentId}/consultation-result`, 
      { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error fetching consultation result PDF:', error);
        throw error; // Re-throw to handle in component
      })
    );
  }
} 