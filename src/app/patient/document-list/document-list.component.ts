import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SecureDocumentService } from '../../services/secure-document.service';
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
    private secureDocService: SecureDocumentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

 
  private loadDocuments(): void {
    this.secureDocService.getDocumentsForPatient(this.patientId).subscribe({
      next: (data) => {
        this.docList = data;
        console.log('Documents loaded securely:', this.docList);
      },
      error: (error) => {
        console.error('Error loading documents:', error);
        this.notificationService.warning('Error', 'Failed to load documents');
      }
    });
  }


  openPdfSecure(document: Document): void {
      this.secureDocService.openDocumentSecure(this.patientId, document.id!);
  }


  openPdf(document: Document): void {
    this.openPdfSecure(document);
  }

  onUpload(event: any): void {
    const file: File = event.files[0];

    if (!file || file.type !== 'application/pdf') {
      this.notificationService.warning('Error', 'File should be in PDF format');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.secureDocService.uploadPdf(this.patientId, formData).subscribe({
      next: (response) => {
        this.notificationService.success(
          'Success',
          'The file was successfully uploaded'
        );

        // Reload the document list
        this.loadDocuments();

        // Clear the p-fileUpload component !!!!!!!@
        this.fileUpload.clear();
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.notificationService.warning(
          'Error',
          'There was an error uploading the file, try again later'
        );
      },
    });
  }
}
