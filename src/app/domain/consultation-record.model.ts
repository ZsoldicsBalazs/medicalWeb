export interface ConsultationRecord {
  recordId: number;
  appointmentId: number;
  diagnosis: string;
  results: string;
  created_at: string;
  drName: string;
  department: string;
}
