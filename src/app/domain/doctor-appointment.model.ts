import { AppointmentStatus } from "./appointment-status.model";

export interface DoctorAppointment{
    id: number,
    patientLastName: string,
    patientFirstName: string,
    appointmentDate: Date,
    appointmentTime: Date,
    status: AppointmentStatus,
    patientId: string
}