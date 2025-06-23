import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorAppointment } from '../domain/doctor-appointment.model';
import { Observable } from 'rxjs';
import { Doctor } from '../domain/doctor.model';
import { AppointmentRequest } from '../domain/appointment-request.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apointmentURL = "http://localhost:1212/api/v1/appointment";

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
    
    return this.http.get<DoctorAppointment[]>(`${this.apointmentURL}/dr`,{params})

  }


  getAllDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(`${this.apointmentURL}/all/doctors`);
  }

  getTimeSlotsByDrIdAndDate(drId: string, date: Date): Observable<string[]> {
    const formattedDate = date.toISOString().split('T')[0]; // "yyyy-MM-dd"
  
    const params = new HttpParams().set('date', formattedDate);
  
    return this.http.get<string[]>(`${this.apointmentURL}/dr/${drId}`, { params });
  }


  submitAppointment(drId: string, date: Date, time: string, patientId: string): Observable<any>{
    const apRequest: AppointmentRequest = {
      drId: drId,
      date: date.toISOString().split('T')[0],
      time: time,
      patientId: patientId
    }

    console.log("---------> " + apRequest );

    return this.http.post<any>(`${this.apointmentURL}/book`,apRequest);
    
  }
  
}
