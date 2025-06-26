import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultationRecordService {

  private RECORD_URL= 'http://localhost:1212/api/v1/record';

  constructor(private httpClient: HttpClient) {

   }


   


}
