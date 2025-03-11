import { Time } from "@angular/common";

export interface UserAppointment{
    id: number,
    doctorName: String,
    doctorLastName: String,
    department: String,
    appointmentDate: Date,
    appointmentTime: Date,
    status: String,
}