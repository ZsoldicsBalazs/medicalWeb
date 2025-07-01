import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../domain/doctor.model';
import { NotificationService } from '../../../services/notification.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-doctor-free-day-scheduler',
  templateUrl: './doctor-free-day-scheduler.component.html',
  styleUrl: './doctor-free-day-scheduler.component.css',
})
export class DoctorFreeDaySchedulerComponent implements OnInit {
  doctorFreeDays: Date[] = [];
  drprofile: Doctor | undefined;
  selectedDates: Date[] = [];

  consultationInterval: any[] = [
    { name: '15 min', value: 15 },
    { name: '30 min', value: 30 },
    { name: '60 min', value: 60 },
  ];
  consultationIntervalValue!: number;

  constructor(
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let profileObj = this.authService.getProfileDetails();
    let obj = JSON.parse(profileObj ?? '{}');
    this.drprofile = obj as Doctor;
    this.selectedDates = [];
    this.consultationIntervalValue = Number.parseInt(
      this.drprofile.intervalMinutes
    );

    this.doctorService.fetchDaysOffForDoctor(this.drprofile).subscribe(
      (data) => {
        this.doctorFreeDays = data.map((dateStr) => new Date(dateStr));
        console.log(this.doctorFreeDays);
      },
      (error) => {
        this.notificationService.notify('warn', 'Error', error.message);
      }
    );
  }

  saveInterval() {
    console.log('interval = ' + this.consultationIntervalValue);
  }

  confirmChangeInterval(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'Are you sure that you want to change the consultation interval to ' +
        this.consultationIntervalValue,
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.doctorService
          .saveTimeIntervalForDoctor(
            this.consultationIntervalValue,
            this.drprofile!.id
          )
          .subscribe(
            () => {
              this.notificationService.info(
                'Interval Changed',
                'You changed the interval to ' + this.consultationIntervalValue
              );
            },
            (error) => {
              this.notificationService.warning(
                'Interval not changed',
                error.error.message
              );
            }
          );

        //TODO UPDATE INTERVAL ON DOCTOR ENDPOINT !
      },
      reject: () => {
        this.notificationService.info(
          'Interval not changed',
          ' ' + this.consultationIntervalValue
        );
      },
    });
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isNonWorkingDay(date: any): boolean {
    const jsDate = new Date(date.year, date.month, date.day);
    return this.doctorFreeDays.some((d) => this.isSameDate(d, jsDate));
  }

  toggleNonWorkingDay(date: Date): void {
    // Normalize the date to midnight local time
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const index = this.doctorFreeDays.findIndex((d) =>
      this.isSameDate(d, normalizedDate)
    );

    if (index !== -1) {
      this.doctorFreeDays.splice(index, 1);
    } else {
      this.doctorFreeDays.push(normalizedDate);
    }
  }

  saveSchedule() {
    const formattedDates = this.doctorFreeDays.map((date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // lunile sunt de la 0
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`; // Format ISO fără fus orar
    });

    console.log('Trimitem spre backend:', formattedDates);

    this.doctorService
      .saveDaysOffForDoctor(formattedDates, this.drprofile!.id)
      .subscribe(
        (data) => {
          this.notificationService.info('Zilele libere au fost salvate!', '');
        },
        (error) => {
          this.notificationService.warning('Eroare', error.message);
        }
      );
  }
}
