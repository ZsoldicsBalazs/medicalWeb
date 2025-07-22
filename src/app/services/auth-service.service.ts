import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UserRegistration } from '../domain/user-registration.model';
import { Patient } from '../domain/patient.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private authUrl = `${environment.apiBaseUrl}/auth`;
  private patientUrl = `${environment.apiBaseUrl}/patient`;
  private isAuthenticatedBoolean = false;

  constructor(private http: HttpClient) {
    this.isAuthenticatedBoolean= !!localStorage.getItem(this.tokenKey)
   }

  login(email: string, password: string): Observable<any> {
    localStorage.clear();
    return this.http.post<any>(`${this.authUrl}/authenticate`, { email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Extragem mesajul de eroare de la backend.
          
          let errorMsg = 'Unknown error!';
          if (error && error.message) {
            errorMsg = error.error.message;
          } else {
            errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.error('Error during login:', errorMsg);
          return throwError(() => errorMsg);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  IsAuthenticatedUser(): boolean{
    return this.isAuthenticatedBoolean;
  }
  setIsAuthenticatedUser(boolean: boolean){
    this.isAuthenticatedBoolean=boolean;
  }
  setProfileID(id: string){
    localStorage.setItem("profileID",id);
  }
  setProfileToLocalStorage(user: any){
    localStorage.setItem('userProfile', JSON.stringify(user));
  }
  getProfileDetails(){
    return localStorage.getItem("userProfile");
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getProfileId(){
    return localStorage.getItem('profileID');
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('profileID');
    localStorage.removeItem('userProfile');
    localStorage.clear();
    this.isAuthenticatedBoolean=false;
    console.log("deleted credentials")
    window.location.href = '/auth';
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  validateToken(): Observable<boolean>{
    const token= this.getToken();
    console.log(token);
    if(!token) return of(false);
    return this.http.get<boolean>(`${this.authUrl}/validate-token?token=${token}`)
            .pipe(
              catchError(()=> of(false))
            )
            
  }


  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) return null; // Verificam ca token-ul are 3 parte
  
      const tokenPayload = JSON.parse(atob(tokenParts[1])); // Decodificam payloadul
  
      // Verific daca exista un camp 'roles' si extragem 'authority'
      if (tokenPayload && tokenPayload.roles && tokenPayload.roles.length > 0) {
        return tokenPayload.roles[0].authority; // Extragem 'authority' din primul rol
      } else {
        console.error('No roles found in token payload');
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  registerUser(user: UserRegistration): Observable<UserRegistration>{
    return this.http.post<UserRegistration>(`${this.authUrl}/register`,user);
  }

  getUserProfile(): Observable<Patient> {
    
    return this.http.get<Patient>(`${this.patientUrl}/me`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
        console.error('Error fetching profile:', errorMsg);
        return throwError(() => errorMsg);
      })
    );
  }






}
