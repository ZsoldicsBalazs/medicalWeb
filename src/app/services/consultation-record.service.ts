import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultationRecordCreated } from '../domain/consultationRecord-request.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultationRecordService {
  private RECORD_URL = `${environment.apiBaseUrl}/record`;

  constructor(private httpClient: HttpClient) {}

  saveConsultationRecord(
    record: ConsultationRecordCreated
  ): Observable<string> {
    return this.httpClient.post(this.RECORD_URL, record, {
      responseType: 'text', // IMPORTANT
    });
  }

  getConsultationRecordPDF(recordId: number): void{
     this.httpClient.get(`${this.RECORD_URL}/${recordId}/pdf`, {
      responseType: 'blob' 
    }).subscribe(blob => {
      const file = new Blob([blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = `consultation_report_${recordId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); 
    });
  }
  

}
