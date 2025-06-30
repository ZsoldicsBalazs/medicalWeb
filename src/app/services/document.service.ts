import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../domain/documents.model';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private filesBaseUrl = 'http://localhost:1212/api/v1/files';
  constructor(private http: HttpClient) {}

  getDocumentsForPatient(id: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.filesBaseUrl}/${id}`);
  }

  getPdfDocument(fileUrl: string): Observable<Blob> {
    const params = new HttpParams().set(
      'filepath',
      fileUrl.replace(/\\/g, '/')
    ); // înlocuiește \ cu /
    return this.http.get(`${this.filesBaseUrl}/pdf`, {
      params,
      responseType: 'blob',
    });
  }

  uploadPdf(patientId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.filesBaseUrl}/${patientId}/upload`, formData);
  }
}
