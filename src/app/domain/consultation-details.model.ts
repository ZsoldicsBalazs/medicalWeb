export interface ConsultationDetails {
   id: number,
   appointmentId: number,
   diagnosis: string,
   results: string,
   created_at: Date,
   drName: string,
   department: string
}