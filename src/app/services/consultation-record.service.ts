import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultationRecordCreated } from '../domain/consultationRecord-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationRecordService {
  private RECORD_URL = 'http://localhost:1212/api/v1/record';

  constructor(private httpClient: HttpClient) {}

  saveConsultationRecord(
    record: ConsultationRecordCreated
  ): Observable<string> {
    return this.httpClient.post(this.RECORD_URL, record, {
      responseType: 'text', // 👈 IMPORTANT
    });
  }
}
