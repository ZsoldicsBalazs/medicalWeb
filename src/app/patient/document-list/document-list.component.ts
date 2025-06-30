import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../domain/documents.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  @Input() patientId!: number;

  docList: Document[] = [];
  selectedFile: File | null = null;
  isPdf: boolean = false;

  constructor(
    private docserv: DocumentService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.docserv.getDocumentsForPatient(this.patientId).subscribe(
      (data) => {
        this.docList = data;
        console.log(this.docList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openPdf(filePath: string): void {
    this.docserv.getPdfDocument(filePath).subscribe((blob) => {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    });
  }

  onUpload(event: any): void {
    const file: File = event.files[0];

    if (!file || file.type !== 'application/pdf') {
      this.notificationService.warning('Error', 'File should be in PDF format');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

   

    this.docserv.uploadPdf(this.patientId, formData).subscribe({
      next: () => {
        this.notificationService.success(
          'Succes',
          'The file was succesfully uploaded'
        );
      },
      error: () => {
        this.notificationService.warning(
          'Error',
          'There is an error on uploading file, try again later'
        );
      },
    });
  }
}
