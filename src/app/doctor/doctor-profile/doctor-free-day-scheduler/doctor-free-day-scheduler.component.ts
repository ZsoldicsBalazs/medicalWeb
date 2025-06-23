import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../domain/doctor.model';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-doctor-free-day-scheduler',
  templateUrl: './doctor-free-day-scheduler.component.html',
  styleUrl: './doctor-free-day-scheduler.component.css'
})
export class DoctorFreeDaySchedulerComponent implements OnInit {
 
  doctorFreeDays: Date[] =[];
  drprofile: Doctor | undefined;
  selectedDates: Date[] = [];   

  constructor(private authService: AuthService, private doctorService: DoctorService, private notificationService: NotificationService){}


  ngOnInit(): void {
     let profileObj = this.authService.getProfileDetails();
        let obj =JSON.parse(profileObj ?? '{}');
        this.drprofile=obj as Doctor;
        this.selectedDates = [];

        this.doctorService.fetchDaysOffForDoctor(this.drprofile).subscribe((data)=>{
          this.doctorFreeDays=data.map(dateStr => new Date(dateStr))
          console.log(this.doctorFreeDays);
        },
        (error) => {
          this.notificationService.notify("warn","Error",error.message);
        } )
  }


  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  isNonWorkingDay(date: any): boolean {
    const jsDate = new Date(date.year, date.month, date.day);
    return this.doctorFreeDays.some(d => this.isSameDate(d, jsDate));
  }
  

  toggleNonWorkingDay(date: Date): void {
    const index = this.doctorFreeDays.findIndex(d => this.isSameDate(d, date));
  
    if (index !== -1) {
      // ziua există deja 
      this.doctorFreeDays.splice(index, 1);
    } else {
      // adaugă o copie a zilei (fara timp)
      const onlyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      this.doctorFreeDays.push(onlyDate);
    }
  }
  
  saveSchedule() {
    // Trimite selectedDates (zile lucrătoare) și/sau nonWorkingDays la backend

    this.doctorService.saveDaysOffForDoctor(this.doctorFreeDays,this.drprofile!.id).subscribe((data)=> {
      this.notificationService.info("New free dates updated","")
    },
    (error) => {
      this.notificationService.warning("Error",error.message)
    }
  );
    console.log("Zile lucrătoare:", this.selectedDates);
    console.log("Zile nelucrătoare:", this.doctorFreeDays);
  }


}
