import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../domain/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css',
})
export class BookAppointmentComponent implements OnInit {
  steps: MenuItem[] = [
    { label: 'Select Speciality' },
    { label: 'Select Doctor' },
    { label: 'Select Date' },
    { label: 'Select Time Slot' },
  ];

  profileId: string | undefined;

  activeStep: number = 0;
  noDataMessage: string | null = null;
  specialities: string[] = ['Neurology', 'Cardiology', 'Orthopedics'];
  doctorList: Doctor[] | undefined;
  allDoctors: Doctor[] = [];
  doctorFreeDays: Date[] | undefined;

  selectedDoctor: Doctor | null = null;
  selectedSpeciality: string = '';
  selectedDate: Date | null = null;

  minDate: Date = new Date(); // Today
  // maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 7));

  timeSlot: string[] = [];
  selectedTimeSlot: string | undefined;

  constructor(
    private appointmentService: AppointmentService,
    private drService: DoctorService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  onSpecialtySelect(value: string) {
    console.log('selecteeeeeeeed speciality');
    this.steps[0].label = `Speciality: ${this.selectedSpeciality}`;
    this.activeStep = 1;
    this.selectedDoctor = undefined!;
    this.selectedDate = undefined!;
    this.selectedSpeciality = value;
    this.doctorList = this.allDoctors.filter((dr) => dr.department === value);
    console.log(this.doctorList);
    this.resetStepLabels(1);
  }

  onDoctorSelect(doctorSelected: Doctor) {
    this.selectedDoctor = doctorSelected;
    this.steps[1].label = `Dr. ${
      this.selectedDoctor.firstName + ' ' + this.selectedDoctor.lastName
    }`;
    this.activeStep = 2;
    console.log(doctorSelected);
    this.resetStepLabels(2);
    //FETCH DOCTOR DATES WHEN FULL OR FREE DAY.

    this.drService.fetchDaysOffForDoctor(this.selectedDoctor).subscribe(
      (data) => {
        this.doctorFreeDays = data.map((dateStr) => new Date(dateStr));
      },
      (error) => {
        this.notificationService.notify('warn', 'Error', error.message);
      }
    );
  }

  onDateSelect() {
    console.log(this.selectedDate);
    this.activeStep = 3;
    this.steps[2].label = this.selectedDate?.toLocaleDateString();
    this.fetchTimeSlots(this.selectedDoctor!.id, this.selectedDate!);
    // FETCH TIME SLOTS FOR DOCTOR BY DATE SELECTED
  }

  private fetchTimeSlots(drId: string, date: Date) {
    this.appointmentService.getTimeSlotsByDrIdAndDate(drId, date).subscribe(
      (data) => {
        this.timeSlot = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitAppointment() {
    this.appointmentService
      .submitAppointment(
        this.selectedDoctor!.id,
        this.selectedDate!,
        this.selectedTimeSlot!,
        this.profileId!
      )
      .subscribe(
        (data) => {
          this.notificationService.success(
            'Success',
            'Succesfully created reservation'
          );
        },
        (error) => {
          if (error.error && error.error.message) {
            this.notificationService.warning(
              'Reservation error',
              error.error.message
            );
          } else {
            this.notificationService.warning(
              'Unexpected error',
              'Something went wrong.'
            );
          }
          console.error('Backend error: ', error);
        }
      );
  }

  ngOnInit(): void {
    this.appointmentService.getAllDoctors().subscribe((data) => {
      this.allDoctors = data;
      this.doctorList = [...this.allDoctors];
    });

    const role = this.authService.getRoleFromToken();
    if (role === 'ROLE_PATIENT') {
      this.profileId = this.authService.getProfileId()!;
    } else {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.profileId = id;
        } else {
          // opțional: fallback/error
          console.warn('ID-ul pacientului lipsește din URL');
        }
      });
    }
  }

  resetStepLabels(fromIndex: number) {
    for (let i = fromIndex; i < this.steps.length; i++) {
      switch (i) {
        case 1:
          this.steps[i].label = 'Doctor';
          break;
        case 2:
          this.steps[i].label = 'Date';
          break;
      }
    }
  }
}
