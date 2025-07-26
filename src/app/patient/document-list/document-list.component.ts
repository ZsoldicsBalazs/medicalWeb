import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../domain/documents.model';
import { NotificationService } from '../../services/notification.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  @Input() patientId!: number;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  docList: Document[] = [];
  selectedFile: File | null = null;
  isPdf: boolean = false;

  constructor(
    private docserv: DocumentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  /**
   * Load documents for the current patient
   */
  private loadDocuments(): void {
    this.docserv.getDocumentsForPatient(this.patientId).subscribe(
      (data) => {
        this.docList = data;
        console.log('Documents loaded:', this.docList);
      },
      (error) => {
        console.error('Error loading documents:', error);
        this.notificationService.warning('Error', 'Failed to load documents');
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
      next: (response) => {
        this.notificationService.success(
          'Succes',
          'The file was succesfully uploaded'
        );

        // Reload the document list to include the newly uploaded file
        this.loadDocuments();

        // Clear the p-fileUpload component properly
        this.fileUpload.clear();
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.notificationService.warning(
          'Error',
          'There is an error on uploading file, try again later'
        );
      },
    });
  }
}
