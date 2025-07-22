import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../domain/userdto.model';
import { DoctorRegistrationRequest } from '../domain/doctor-registration.model';
import { Doctor } from '../domain/doctor.model';
import { SecretaryRegistrationRequest } from '../domain/secretary-registration-request.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private USERS_URL = `${environment.apiBaseUrl}/users`;
  private ADMIN_URL = `${environment.apiBaseUrl}/admin`;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.USERS_URL}`);
  }

  updateUserRole(user: UserDTO): Observable<any> {
    return this.http.put(`${this.USERS_URL}/${user.user_id}/role`, user);
  }

  registerDoctor(request: DoctorRegistrationRequest): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.ADMIN_URL}/register-doctor`, request);
  }

  registerSecretary(request: SecretaryRegistrationRequest): Observable<any> {
    return this.http.post(`${this.ADMIN_URL}/register-secretary`, request);
  }
}
