import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from '../domain/procedure.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  private procedureURL= `${environment.apiBaseUrl}/procedures`

  constructor(private http: HttpClient) { }



  getAllProcedures(): Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.procedureURL);
  }

  
}
