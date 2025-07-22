import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Cons, Observable, throwError } from 'rxjs';
import { Patient } from '../domain/patient.model';
import { UserAppointment } from '../domain/user-appointment.model';
import { ConsultationRecord } from '../domain/consultation-record.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
private patientsUrl = `${environment.apiBaseUrl}/patient`;

  constructor(private http: HttpClient) { }


  // <===== PATIENT =====>
  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.patientsUrl)
  }

  getPatientById(id: string): Observable<Patient>{
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`);
  }
  // getMyProfile(): Observable<Patient>{
  //   return this.http.get<Patient>('http://localhost:1212/api/v1/profile');
  // }

  updatePatient(updatedPatient: Patient){
    return this.http.put<Patient>(`${this.patientsUrl}`,updatedPatient);
  }

  getPatientsBySearch(word: any): Observable<Patient[]>{
    let params = new HttpParams;
    params = params.set("search", word);
     return this.http.get<Patient[]>(`${this.patientsUrl}/search/fulltext`,{params})
   }


   // <===== CONSULTATION RECORD =====>

   getConsultationRecordByPatientId(patientId: number): Observable<ConsultationRecord[]>{
    return this.http.get<ConsultationRecord[]>(`${this.patientsUrl}/${patientId}/consultations`)
   }

}
