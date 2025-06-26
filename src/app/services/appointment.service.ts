import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorAppointment } from '../domain/doctor-appointment.model';
import { Observable } from 'rxjs';
import { Doctor } from '../domain/doctor.model';
import { AppointmentRequest } from '../domain/appointment-request.model';
import { UserAppointment } from '../domain/user-appointment.model';
import { AppointmentDrAndPatient } from '../domain/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private APPOINTMENT_URL = 'http://localhost:1212/api/v1/appointment';

  constructor(private http: HttpClient) {}

  searchAppointments(searchParams: any): Observable<DoctorAppointment[]> {
    let params = new HttpParams();

    if (searchParams.cnp) {
      params = params.set('cnp', searchParams.cnp);
    }
    if (searchParams.patientName) {
      params = params.set('patientName', searchParams.patientName);
    }
    if (searchParams.patientFirstName) {
      params = params.set('patientFirstName', searchParams.patientFirstName);
    }
    if (searchParams.appointmentDate) {
      params = params.set('appointmentDate', searchParams.appointmentDate);
    }

    return this.http.get<DoctorAppointment[]>(`${this.APPOINTMENT_URL}/dr`, {
      params,
    });
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.APPOINTMENT_URL}/all/doctors`);
  }

  getTimeSlotsByDrIdAndDate(drId: string, date: Date): Observable<string[]> {
    const formattedDate = date.toLocaleDateString('en-CA'); // "yyyy-MM-dd"
    console.log('===========> FOrmatted date:' + formattedDate);
    const params = new HttpParams().set('date', formattedDate);

    return this.http.get<string[]>(`${this.APPOINTMENT_URL}/dr/${drId}`, {
      params,
    });
  }

  submitAppointment(
    drId: string,
    date: Date,
    time: string,
    patientId: string
  ): Observable<any> {
    const apRequest: AppointmentRequest = {
      drId: drId,
      date: date.toLocaleDateString('en-CA'),
      time: time,
      patientId: patientId,
    };

    console.log('---------> ' + apRequest);

    return this.http.post<any>(`${this.APPOINTMENT_URL}/book`, apRequest);
  }

  getAppointmentForConsultation(appointmentId: string): Observable<AppointmentDrAndPatient> {
    return this.http.get<AppointmentDrAndPatient>(`${this.APPOINTMENT_URL}/${appointmentId}`);
  }

  getAppointments(id: number) {
    return this.http.get<UserAppointment[]>(`${this.APPOINTMENT_URL}/patient/${id}`);
  }

  deleteAppointment(apointmentId: number): Observable<any> {
    return this.http.delete<any>(`${this.APPOINTMENT_URL}/${apointmentId}`);
  }
}
