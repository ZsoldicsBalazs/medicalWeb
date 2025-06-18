import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../domain/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit{
  
  steps: MenuItem[] = [
    { label: 'Select Speciality' },
    { label: 'Select Doctor' },
    { label: 'Select Date' },
    { label: 'Select Time Slot' },
  ];


  activeStep: number = 0;
  noDataMessage: string | null = null;
  specialities: string[] = ["chirurgie","radiologie","ORL",];
  doctorList: Doctor[] | undefined;
  doctorFreeDays: Date[] | undefined;

  selectedDoctor: Doctor | null = null;
  selectedSpeciality: string = "";
  selectedDate: Date | null = null;

  minDate: Date = new Date(); // Today
  // maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 7));

  constructor(private appointmentService: AppointmentService, private drService: DoctorService, private notificationService: NotificationService){
  
  }

  onSpecialtySelect(value: string){
    console.log('selecteeeeeeeed speciality')
    this.steps[0].label = `Speciality: ${this.selectedSpeciality}`;
    this.activeStep=1;
    this.selectedDoctor = undefined!;
    this.selectedDate = undefined!;
    this.selectedSpeciality= value;
    this.doctorList = this.doctorList?.filter(dr => dr.department==value);
    console.log(this.doctorList);
    this.resetStepLabels(1);
  }

  onDoctorSelect(doctorSelected: Doctor){
    this.selectedDoctor=doctorSelected;
    this.steps[1].label = `Dr. ${this.selectedDoctor.firstName + " " + this.selectedDoctor.lastName}`;
    this.activeStep=2;
    console.log(doctorSelected);
    this.resetStepLabels(2);
    //FETCH DOCTOR DATES WHEN FULL OR FREE DAY.

    this.drService.fetchDaysOffForDoctor(this.selectedDoctor).subscribe((data) => {
      this.doctorFreeDays = data.map(dateStr => new Date(dateStr))
    },
    (error) => {
      this.notificationService.notify("warn","Error",error.message);
    }
  )
  }

  onDateSelect(){
    console.log(this.selectedDate);
    this.activeStep=3;
    this.steps[2].label = this.selectedDate?.toLocaleDateString();

    // FETCH TIME SLOTS FOR DOCTOR BY DATE SELECTED
  }


  ngOnInit(): void {
    this.appointmentService.getAllDoctors().subscribe((data) => {
      this.doctorList=data;
    })
  }

  resetStepLabels(fromIndex: number) {
    for (let i = fromIndex; i < this.steps.length; i++) {
      switch (i) {
        case 1: this.steps[i].label = 'Doctor'; break;
        case 2: this.steps[i].label = 'Date'; break;
      }
    }
  }

}
