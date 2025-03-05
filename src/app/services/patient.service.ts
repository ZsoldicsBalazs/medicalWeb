import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../domain/patient.model';

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
    return this.http.get<Patient>(`http://localhost:1212/api/v1/admin/patients/${id}`);
  }
  getMyProfile(): Observable<Patient>{
    return this.http.get<Patient>('http://localhost:1212/api/v1/profile');
  }

  updatePatient(updatedPatient: Patient){
    return this.http.put<Patient>('http://localhost:1212/api/v1/admin/patients',updatedPatient);
  }

}
