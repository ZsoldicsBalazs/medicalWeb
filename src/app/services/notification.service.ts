import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) { }


  public notify(severity: string, summary: string, detail: string){
    this.messageService.add({severity: severity, summary: summary, detail: detail, life: 1500})
  }
}
