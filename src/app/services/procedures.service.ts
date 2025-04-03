import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from '../domain/procedure.model';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {
  private procedureURL= "http://localhost:1212/api/v1/procedures"

  constructor(private http: HttpClient) { }



  getAllProcedures(): Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.procedureURL);
  }
}
