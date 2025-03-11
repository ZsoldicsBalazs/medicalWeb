import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../domain/patient.model';
import { UserAppointment } from '../domain/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
private patientsUrl = "http://localhost:1212/api/v1/admin/patients"
  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.patientsUrl)
  }

  getPatientById(id: number): Observable<Patient>{
    return this.http.get<Patient>(`http://localhost:1212/api/v1/patient/${id}`);
  }
  getMyProfile(): Observable<Patient>{
    return this.http.get<Patient>('http://localhost:1212/api/v1/profile');
  }

  updatePatient(updatedPatient: Patient){
    return this.http.put<Patient>('http://localhost:1212/api/v1/patient',updatedPatient);
  }

  getAppointments(id: number){
    return this.http.get<UserAppointment[]>(`http://localhost:1212/api/v1/appointment/${id}`)
  }

}
