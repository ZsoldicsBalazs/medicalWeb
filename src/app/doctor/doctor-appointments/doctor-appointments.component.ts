import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { DoctorAppointment } from '../../domain/doctor-appointment.model';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.css'
})
export class DoctorAppointmentsComponent implements OnInit {

  appointments: DoctorAppointment[]=[];
  private  id: number = Number( localStorage.getItem('profileID')) ;
  searchCNP: string = '';
  searchName: string = '';
  searchFirstName: string = '';
  searchDate: string = '';
  errorMsg: string ="";
  notFound: boolean=false;


  constructor(private drService: DoctorService, private appointmentService: AppointmentService){}

  ngOnInit(): void {
    this.appointmentService.searchAppointments(this.getCurrentDate(),this.id,).subscribe(
      (data)=>{
        this.appointments=data;
    },
  (error) => {
    this.notFound=true;
    this.errorMsg=error;
    console.log(error);
  })
  }
  getCurrentDate(){
    const today = new Date(); // Obține data și ora curentă din sistem
    const year = today.getFullYear(); // Extrage anul
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Extrage luna și adaugă leading zero
    const day = String(today.getDate()).padStart(2, '0'); // Extrage ziua și adaugă leading zero

    const formattedDate = {appointmentDate: `${year}-${month}-${day}`}; // Formatează data ca yyyy-mm-dd
    return formattedDate;
  }

  onSearch(){
    const searchParams={
      cnp: this.searchCNP,
      patientName: this.searchName,
      patientFirstName: this.searchFirstName,
      appointmentDate: this.searchDate
    };

    this.appointmentService.searchAppointments(searchParams,this.id).subscribe(
      (data) => {
        if(data.length===0){
          this.notFound=true;
          this.errorMsg="Nu s-a gasit consultatii";
          return;
        }
        this.notFound=false;
        this.appointments=[...data];
      },
      (error)=>{
        console.log(error.error.message)
      }
    )
  }
}
