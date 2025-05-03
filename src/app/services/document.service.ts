import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Document} from '../domain/documents.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private filesBaseUrl = "http://localhost:1212/api/v1/files"
  constructor(private http: HttpClient) { }

  getDocumentsForPatient(id: string): Observable<Document[]>{
    return this.http.get<Document[]>(`${this.filesBaseUrl}/${id}`);
  }


}
