import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface AppointmentDrAndPatient{
    appointmentDate: string,
    appointmentTime: string,
    doctor: Doctor,
    patient: Patient
}