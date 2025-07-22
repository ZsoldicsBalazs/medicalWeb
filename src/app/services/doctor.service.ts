import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorAppointment } from '../domain/doctor-appointment.model';

import { Doctor } from '../domain/doctor.model';
import { DoctorProcedure } from '../domain/doctor-procedure.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private aptURL = `${environment.apiBaseUrl}/appointment`;
  private doctorURL = `${environment.apiBaseUrl}/medic`;
  private daysOFFURL = `${environment.apiBaseUrl}/days-off`;

  constructor(private http: HttpClient) {}

  getAppointmentForDr(id: number) {
    return this.http.get<DoctorAppointment[]>(`${this.aptURL}/dr/${id}`);
  }

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

    return this.http.get<DoctorAppointment[]>(`${this.aptURL}/dr`, { params });
  }

  getDrById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.doctorURL}/${id}`);
  }

  updateDoctor(drprofile: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.doctorURL}`, drprofile);
  }

  // PROCEDURES

  getAllProceduresByDrId(id: string): Observable<DoctorProcedure[]> {
    return this.http.get<DoctorProcedure[]>(
      `${this.doctorURL}/${id}/procedures`
    );
  }

  addProcedureToDr(
    id: string,
    dp: DoctorProcedure
  ): Observable<DoctorProcedure> {
    return this.http.post<DoctorProcedure>(
      `${this.doctorURL}/${id}/procedures`,
      dp
    );
  }

  updateProcedureToDr(
    id: string,
    dp: DoctorProcedure
  ): Observable<DoctorProcedure> {
    return this.http.put<DoctorProcedure>(
      `${this.doctorURL}/${id}/procedures`,
      dp
    );
  }
  deleteDoctorProcedure(
    id: string,
    doctorProcedureID: string
  ): Observable<Boolean> {
    return this.http.delete<Boolean>(
      `${this.doctorURL}/${id}/procedures/${doctorProcedureID}`
    );
  }

  // FREEE DAYS

  fetchDaysOffForDoctor(medic: Doctor): Observable<Date[]> {
    console.log(`${this.doctorURL}/${medic.id}/days-off}`);
    return this.http.get<Date[]>(`${this.daysOFFURL}/${medic.id}`);
  }

  saveDaysOffForDoctor(
    newOffDates: string[],
    medicId: string
  ): Observable<Date[]> {
    console.log(`${this.doctorURL}/${medicId}/days-off`);
    return this.http.post<Date[]>(`${this.daysOFFURL}/${medicId}`, newOffDates);
  }

  saveTimeIntervalForDoctor(interval: number, id: string) {
    return this.http.put<number>(
      `${this.doctorURL}/${id}/timeInterval`,
      interval
    );
  }
}
