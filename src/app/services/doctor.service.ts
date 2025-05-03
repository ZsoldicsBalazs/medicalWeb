import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorAppointment } from '../domain/doctor-appointment.model';

import { Doctor } from '../domain/doctor.model';
import { DoctorProcedure } from '../domain/doctor-procedure.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
 
  private aptURL = "http://localhost:1212/api/v1/appointment";
  private doctorURL = "http://localhost:1212/api/v1/medic"

  constructor(private http: HttpClient) {
   }

   getAppointmentForDr(id: number){
    return this.http.get<DoctorAppointment[]>(`${this.aptURL}/dr/${id}`);
   }

   getDrById(id: string): Observable<Doctor>{
    return this.http.get<Doctor>(`${this.doctorURL}/${id}`)
   }

   updateDoctor(drprofile: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.doctorURL}`,drprofile);
  }

  getAllProceduresByDrId(id: string): Observable<DoctorProcedure[]>{
    return this.http.get<DoctorProcedure[]>(`${this.doctorURL}/${id}/procedures`);
  }

  addProcedureToDr(id: string, dp: DoctorProcedure): Observable<DoctorProcedure>{
    return this.http.post<DoctorProcedure>(`${this.doctorURL}/${id}/procedures`,dp);
  }

  updateProcedureToDr(id: string, dp: DoctorProcedure): Observable<DoctorProcedure>{
    return this.http.put<DoctorProcedure>(`${this.doctorURL}/${id}/procedures`,dp);
  }
  deleteDoctorProcedure(id: string, doctorProcedureID: string): Observable<Boolean>{
    return this.http.delete<Boolean>(`${this.doctorURL}/${id}/procedures/${doctorProcedureID}`)
  }



  
}
