import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private filesBaseUrl = "http://localhost:1212/api/v1/files"
  constructor(private http: HttpClient) { }

  getDocumentsForPatient(id: number){
    this.http.get(`${this.filesBaseUrl}/${id}`)
  }


}
