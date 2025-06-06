import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorAppointment } from '../domain/doctor-appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = "http://localhost:1212/api/v1/appointment";

  constructor(private http: HttpClient) { }

  searchAppointments(searchParams: any): Observable<DoctorAppointment[]>{
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
    
    return this.http.get<DoctorAppointment[]>(`${this.apiUrl}/dr`,{params})

  }

}
