import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ConsultationRecord } from '../../domain/consultation-record.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-consultation-list',
  templateUrl: './patient-consultation-list.component.html',
  styleUrls: ['./patient-consultation-list.component.css'],
  providers: [MessageService]
})
export class PatientConsultationListComponent implements OnInit {
  @Input() patientId!: number;
  consultationRecord: ConsultationRecord[] | undefined;
  selectedRecord: ConsultationRecord | null = null;
  displayDialog: boolean = false;

  constructor(
    private patientService: PatientService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log("Patient ID received:", this.patientId);
    this.patientService.getConsultationRecordByPatientId(this.patientId).subscribe(
      data => {
        this.consultationRecord = data;
        console.log("Consultation records loaded:", data);
      },
      error => {
        console.error("Error loading consultation records:", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load consultation records' });
      }
    );
  }

  onRowSelect(event: any): void {
    console.log("Row selected:", event.data); // Debug log
    this.selectedRecord = event.data;
    this.displayDialog = true;
  }

  downloadPDF(): void {
    if (!this.selectedRecord) {
      console.warn("No record selected for PDF download");
      return;
    }

    const element = document.getElementById('pdf-content');
    if (element) {
      import('html2canvas').then(html2canvas => {
        html2canvas.default(element, { scale: 2 }).then(canvas => {
          import('jspdf').then(jsPDF => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF.default('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`consultation-record-${this.selectedRecord?.recordId}.pdf`);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'PDF downloaded successfully' });
          });
        });
      });
    } else {
      console.error("PDF content element not found");
    }
  }

  closeDialog(): void {
    console.log("Closing dialog"); // Debug log
    this.displayDialog = false;
    this.selectedRecord = null;
  }
}