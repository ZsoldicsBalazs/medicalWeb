import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { AppointmentDrAndPatient } from '../../domain/appointment.model';
import { ConsultationRecord } from '../../domain/consultation-record.model';
import { SelectItem } from 'primeng/api';
import { ConsultationRecordCreated } from '../../domain/consultationRecord-request.model';
import { ConsultationRecordService } from '../../services/consultation-record.service';

@Component({
  selector: 'app-doctor-consultation',
  templateUrl: './doctor-consultation.component.html',
  styleUrls: ['./doctor-consultation.component.css'],
  providers: [MessageService],
})
export class DoctorConsultationComponent implements OnInit {
  appointmentDetails: AppointmentDrAndPatient | undefined;
  templates: SelectItem[] = [
    { label: 'Select a template', value: null, disabled: true },
    { label: 'Normal Template', value: 'normal' },
    { label: 'Ill Template', value: 'ill' },
  ];

  selectedTemplate: string | null = null;

  // Template strings
  private normalTemplate = `
Vital Signs: \n
- Blood Pressure: Normal (120/80 mmHg)\n
- Heart Rate: 70 bpm\n
- Temperature: 36.6°C<br><br>

Examination:<br>
- General condition: Stable<br>
- No acute distress observed<br>
- Normal respiratory and cardiovascular function<br><br>

Recommendations:<br>
- Continue regular check-ups<br>
- Maintain healthy lifestyle
`;
  private illTemplate = `
**Vital Signs**:<br>
- Blood Pressure: Elevated (140/90 mmHg)<br>
- Heart Rate: 90 bpm<br>
- Temperature: 38.0°C<br><br>

**Examination**:<br>
- General condition: Unstable<br>
- Signs of acute illness detected<br>
- Abnormal respiratory or cardiovascular findings<br><br>

**Recommendations**:<br>
- Immediate follow-up required<br>
- Prescribed medication: [Specify]<br>
- Rest and monitor symptoms<br><br>
`;
  results: string | undefined = '';
  diagnosis: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private recordService: ConsultationRecordService
  ) {}

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    if (appointmentId) {
      this.appointmentService
        .getAppointmentForConsultation(appointmentId)
        .subscribe(
          (data) => {
            this.appointmentDetails = data;
            if (data.record) {
              this.diagnosis = data.record.diagnosis;
              this.results = data.record.results;
            }
          },
          (error) => {
            console.error('Error fetching appointment:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            });
          }
        );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No appointment ID provided',
      });
    }
  }

  sanitizeText(rawHtml: string): string {
    const div = document.createElement('div');
    div.innerHTML = rawHtml;
    return div.textContent || div.innerText || '';
  }

  onResultsChange(value: string): void {}

  onTemplateSelect(): void {
    if (!this.selectedTemplate) {
      console.warn('No template selected');
      return;
    }

    let templateText = '';
    if (this.selectedTemplate === 'normal') {
      templateText = this.normalTemplate;
    } else if (this.selectedTemplate === 'ill') {
      templateText = this.illTemplate;
    } else {
      console.warn('Invalid template selected:', this.selectedTemplate);
      return;
    }

    this.results = templateText;

    this.messageService.add({
      severity: 'info',
      summary: 'Template Added',
      detail: `Added ${this.selectedTemplate} template to results`,
    });
  }

  saveConsultation(): void {
    if (!this.appointmentDetails) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill in all fields',
      });
      return;
    }

    const consultationRecord: ConsultationRecordCreated = {
      appointmentId: Number(this.route.snapshot.paramMap.get('id')),
      diagnosis: this.diagnosis,
      results: this.results!,
      drName: `${this.appointmentDetails.doctor.firstName} ${this.appointmentDetails.doctor.lastName}`,
      department: this.appointmentDetails.doctor.department,
    };
    console.log('========> SANITEZD' + this.sanitizeText(this.results!));

    this.recordService.saveConsultationRecord(consultationRecord).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: data,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save consultation record',
        });
      }
    );
  }
}
