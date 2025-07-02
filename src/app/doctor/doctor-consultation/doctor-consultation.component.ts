import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { MessageService } from 'primeng/api';
import { AppointmentDrAndPatient } from '../../domain/appointment.model';
import { SelectItem } from 'primeng/api';
import { ConsultationRecordCreated } from '../../domain/consultationRecord-request.model';
import { ConsultationRecordService } from '../../services/consultation-record.service';

@Component({
  selector: 'app-doctor-consultation',
  templateUrl: './doctor-consultation.component.html',
  styleUrls: ['./doctor-consultation.component.css'],
  providers: [MessageService],
})
export class DoctorConsultationComponent implements OnInit, OnDestroy {
  appointmentDetails: AppointmentDrAndPatient | undefined;
  templates: SelectItem[] = [
    { label: 'Select a template', value: null, disabled: true },
    { label: 'Normal Template', value: 'normal' },
    { label: 'Ill Template', value: 'ill' },
  ];

  selectedTemplate: string | null = null;

  // Voice recording properties
  isRecording: boolean = false;
  recognition: SpeechRecognition | null = null;
  isSupported: boolean = false;

  // Template strings with <br> tags for p-editor display
  private normalTemplate = `Vital Signs:<br>
- Blood Pressure: Normal (120/80 mmHg)<br>
- Heart Rate: 70 bpm<br>
- Temperature: 36.6°C<br>
<br>
Examination:<br>
- General condition: Stable<br>
- No acute distress observed<br>
- Normal respiratory and cardiovascular function<br>
<br>
Recommendations:<br>
- Continue regular check-ups<br>
- Maintain healthy lifestyle`;

  private illTemplate = `**Vital Signs**:<br>
- Blood Pressure: Elevated (140/90 mmHg)<br>
- Heart Rate: 90 bpm<br>
- Temperature: 38.0°C<br>
<br>
**Examination**:<br>
- General condition: Unstable<br>
- Signs of acute illness detected<br>
- Abnormal respiratory or cardiovascular findings<br>
<br>
**Recommendations**:<br>
- Immediate follow-up required<br>
- Prescribed medication: [Specify]<br>
- Rest and monitor symptoms`;

  results: string | undefined = '';
  diagnosis: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private recordService: ConsultationRecordService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.initializeSpeechRecognition();
  }

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

  ngOnDestroy(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
    }
  }

  private initializeSpeechRecognition(): void {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.isSupported = true;
      
      // Initialize speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      if (this.recognition) {
        // Configure for Romanian medical language
        this.recognition.lang = 'ro-RO';
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        
        // Set up event handlers
        this.recognition.onstart = () => {
          this.ngZone.run(() => {
            this.isRecording = true;
            this.changeDetectorRef.detectChanges();
            this.messageService.add({
              severity: 'info',
              summary: 'Recording Started',
              detail: 'Voice recording started. Speak in Romanian.',
            });
          });
        };

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          this.ngZone.run(() => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
              } else {
                interimTranscript += transcript;
              }
            }

            if (finalTranscript) {
              this.addTranscriptionToResults(finalTranscript);
            }
          });
        };

        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          this.ngZone.run(() => {
            console.error('Speech recognition error:', event.error);
            this.isRecording = false;
            this.changeDetectorRef.detectChanges();
            this.messageService.add({
              severity: 'error',
              summary: 'Recording Error',
              detail: `Speech recognition error: ${event.error}`,
            });
          });
        };

        this.recognition.onend = () => {
          this.ngZone.run(() => {
            this.isRecording = false;
            this.changeDetectorRef.detectChanges();
            this.messageService.add({
              severity: 'info',
              summary: 'Recording Stopped',
              detail: 'Voice recording stopped.',
            });
          });
        };
      }
    } else {
      this.isSupported = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Supported',
        detail: 'Speech recognition is not supported in this browser.',
      });
    }
  }

  startRecording(): void {
    if (!this.isSupported || !this.recognition) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Supported',
        detail: 'Speech recognition is not supported in this browser.',
      });
      return;
    }

    try {
      this.recognition.start();
      // Force change detection to update UI immediately
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error starting recording:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to start recording.',
      });
    }
  }

  stopRecording(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      // Force change detection to update UI immediately
      this.changeDetectorRef.detectChanges();
    }
  }

  private addTranscriptionToResults(transcript: string): void {
    // Format the transcribed text for medical context
    const formattedText = this.formatMedicalText(transcript);
    
    // Add to existing results with proper spacing
    if (this.results) {
      // Add extra spacing between recording sessions using <br> for display
      this.results += '<br><br>' + formattedText;
    } else {
      this.results = formattedText;
    }

    // Trigger change detection to update the UI
    this.changeDetectorRef.detectChanges();

    this.messageService.add({
      severity: 'success',
      summary: 'Transcription Added',
      detail: 'Voice transcription added to results.',
    });
  }

  private formatMedicalText(text: string): string {
    // Basic formatting for medical text
    let formatted = text.trim();
    
    // Add punctuation if missing at the end
    if (!formatted.match(/[.!?]$/)) {
      formatted += '.';
    }
    
    // Handle temperature values (e.g., "37° c" -> "37°C")
    formatted = formatted.replace(/(\d+)\s*°\s*c/gi, '$1°C');
    
    // Split text into sentences and put each sentence on a new line with <br> for display
    const sentences = formatted.split(/(?<=[.!?])\s+/);
    formatted = sentences.join('<br>');
    
    // Capitalize first letter of each sentence
    formatted = formatted.replace(/(^|\.\s+)([a-zăâîșț])/g, (match, p1, p2) => {
      return p1 + p2.toUpperCase();
    });

    // Add common medical formatting
    const medicalTerms = [
      { pattern: /\b(tensiune|presiune)\s+(arterială|sanguină)\b/gi, replacement: '**$1 $2**' },
      { pattern: /\b(frecvență|ritm)\s+(cardiacă)\b/gi, replacement: '**$1 $2**' },
      { pattern: /\b(temperatură)\b/gi, replacement: '**$1**' },
      { pattern: /\b(diagnostic)\b/gi, replacement: '**$1**' },
      { pattern: /\b(tratament|medicație)\b/gi, replacement: '**$1**' },
      { pattern: /\b(simptome|simptom)\b/gi, replacement: '**$1**' },
      { pattern: /\b(examen|investigație)\b/gi, replacement: '**$1**' },
      { pattern: /\b(recomandare|recomandări)\b/gi, replacement: '**$1**' },
    ];

    medicalTerms.forEach(term => {
      formatted = formatted.replace(term.pattern, term.replacement);
    });

    return formatted;
  }

  private convertHtmlToNewlines(text: string): string {
    if (!text) return '';
    
    // First, normalize all line breaks to <br>
    let result = text.replace(/\r\n|\r|\n/g, '<br>');
    
    // Replace multiple <br> tags with double newline for proper spacing
    result = result.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n');
    
    // Replace remaining single <br> tags with single newline
    result = result.replace(/<br\s*\/?>/gi, '\n');
    
    // Remove any other HTML tags
    result = result.replace(/<[^>]+>/g, '');
    
    // Normalize multiple newlines to maximum of two
    result = result.replace(/\n{3,}/g, '\n\n');
    
    // Ensure proper line endings for database storage
    result = result.replace(/\n/g, '\r\n');
    
    // Trim whitespace but preserve internal line structure
    return result.trim();
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
      diagnosis: this.convertHtmlToNewlines(this.diagnosis),
      results: this.convertHtmlToNewlines(this.results!),
      drName: `${this.appointmentDetails.doctor.firstName} ${this.appointmentDetails.doctor.lastName}`,
      department: this.appointmentDetails.doctor.department,
    };

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
