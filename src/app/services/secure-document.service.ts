import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Document } from '../domain/documents.model';
import { environment } from '../../environment/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SecureDocumentService {
  private filesBaseUrl = `${environment.apiBaseUrl}/files`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getDocumentsForPatient(patientId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.filesBaseUrl}/${patientId}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  downloadDocumentSecure(patientId: number, documentId: number): Observable<Blob> {
    return this.http.get(`${this.filesBaseUrl}/${patientId}/documents/${documentId}`, {
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }


  uploadPdf(patientId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.filesBaseUrl}/${patientId}/upload`, formData)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  openDocumentSecure(patientId: number, documentId: number): void {
    this.downloadDocumentSecure(patientId, documentId).subscribe({
      next: (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        
        // Clean up object URL after a delay
        setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
      },
      error: (error) => {
        console.error('Error opening document:', error);
      }
    });
  }

 
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.status === 403) {
      errorMessage = 'You are not authorized to access this document';
      this.notificationService.warning('Access Denied', errorMessage);
    } else if (error.status === 404) {
      errorMessage = 'Document not found';
      this.notificationService.warning('Not Found', errorMessage);
    } else {
      errorMessage = error.error?.message || 'Failed to process document request';
      this.notificationService.warning('Error', errorMessage);
    }

    console.error('Document service error:', error);
    return throwError(() => new Error(errorMessage));
  }
} 