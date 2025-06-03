import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from '../domain/patient.model';
import { UserAppointment } from '../domain/user-appointment.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
// private patientsUrl = "http://localhost:1212/api/v1/admin/patients";
private patientsUrl2 = "http://localhost:1212/api/v1/patient";

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.patientsUrl2)
  }



  getPatientById(id: string): Observable<Patient>{
    return this.http.get<Patient>(`http://localhost:1212/api/v1/patient/${id}`);
  }
  getMyProfile(): Observable<Patient>{
    return this.http.get<Patient>('http://localhost:1212/api/v1/profile');
  }

  updatePatient(updatedPatient: Patient){
    return this.http.put<Patient>('http://localhost:1212/api/v1/patient',updatedPatient);
  }

  getAppointments(id: number){
    return this.http.get<UserAppointment[]>(`http://localhost:1212/api/v1/appointment/${id}`);
  }
  deleteAppointment(id: number): Observable<void>{
    return this.http.delete<void>(`http://localhost:1212/api/v1/appointment/${id}`);
  }

  getCompletedAppointments(id: number): Observable<UserAppointment[]>{
    return this.http.get<UserAppointment[]>(`http://localhost:1212/api/v1/appointment/${id}/completed`);
  }

  getPatientsBySearch(word: any): Observable<Patient[]>{
    let params = new HttpParams;
    params = params.set("search", word);
     return this.http.get<Patient[]>(this.patientsUrl2+"/fulltext",{params})
   }

}
