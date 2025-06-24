import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) { }


  public notify(severity: string, summary: string, detail: string){
    this.messageService.add({severity: severity, summary: summary, detail: detail, life: 2000})
  }

  public warning(summary: string, detail: string){
    this.messageService.add({severity: "warn", summary: summary, detail: detail, life: 4000})
  }
  public info(summary: string, detail: string){
    this.messageService.add({severity: "info", summary: summary, detail: detail, life: 2500})
  }
  public success(summary: string, detail: string){
    this.messageService.add({severity: "success", summary: summary, detail: detail, life: 2000})
  }





}
