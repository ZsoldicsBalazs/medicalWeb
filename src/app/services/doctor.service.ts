import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorAppointment } from '../domain/doctor-appointment.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private aptURL = "http://localhost:1212/api/v1/appointment"

  constructor(private http: HttpClient) {
   }

   getAppointmentForDr(id: number){
    return this.http.get<DoctorAppointment[]>(`${this.aptURL}/dr/${id}`);
   }
}
