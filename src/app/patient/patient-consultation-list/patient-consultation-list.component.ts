import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ConsultationRecord } from '../../domain/consultation-record.model';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../services/notification.service';
import { ConsultationRecordService } from '../../services/consultation-record.service';

@Component({
  selector: 'app-patient-consultation-list',
  templateUrl: './patient-consultation-list.component.html',
  styleUrls: ['./patient-consultation-list.component.css'],
  providers: [MessageService],
})
export class PatientConsultationListComponent implements OnInit {
  @Input() patientId!: number;
  consultationRecord: ConsultationRecord[] | undefined;
  selectedRecord: ConsultationRecord | null = null;
  displayDialog: boolean = false;

  constructor(
    private patientService: PatientService,
    private notificationService: NotificationService,
    private consultationRecordService: ConsultationRecordService
  ) {}

  ngOnInit(): void {
    console.log('Patient ID received:', this.patientId);
    this.patientService
      .getConsultationRecordByPatientId(this.patientId)
      .subscribe(
        (data) => {
          this.consultationRecord = data;
          console.log('Consultation records loaded:', data);
        },
        (error) => {
          console.error('Error loading consultation records:', error);
          this.notificationService.warning(
            'Error',
            'Failed to load consultation records'
          );
        }
      );
  }

  onRowSelect(event: any): void {
    console.log('Row selected:', event.data); // debug
    this.selectedRecord = event.data;
    this.displayDialog = true;
  }

  downloadPDF(): void {
   //opens new window
    this.consultationRecordService.getConsultationRecordPDF(
      this.selectedRecord?.recordId!
    );
  }

  closeDialog(): void {
    console.log('Closing dialog'); // Debug log
    this.displayDialog = false;
    this.selectedRecord = null;
  }
}
