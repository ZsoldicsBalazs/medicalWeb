import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../domain/doctor.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit{
  
  steps: MenuItem[] = [
    { label: 'Select Date' },
    { label: 'Select Doctor' },
    { label: 'Select Time Slot' },
  ];
  activeStep: number = 0;
  noDataMessage: string | null = null;
  specialities: string[] = ["chirurgie","radiologie","ORL",];
  doctorList: Doctor[] | undefined;


  selectedSpeciality: string = "";

  constructor(private appointmentService: AppointmentService){
    
  }

  onSpecialtySelect(value: string){
    console.log('selecteeeeeeeed speciality')
    this.activeStep=1;
    this.selectedSpeciality= value;
    this.doctorList = this.doctorList?.filter(dr => dr.department==value);
    console.log(this.doctorList);
  }

  onDoctorSelect(){
    console.log()
  }

  ngOnInit(): void {
    this.appointmentService.getAllDoctors().subscribe((data) => {
      this.doctorList=data;
    })
  }

}
