import { AppointmentStatus } from "./appointment-status.model";

export interface DoctorAppointment{
    id: number,
    patientName: string,
    patientFirstName: string,
    appointmentDate: Date,
    appointmentTime: Date,
    status: AppointmentStatus,
}