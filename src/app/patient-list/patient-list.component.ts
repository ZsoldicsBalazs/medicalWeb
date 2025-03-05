import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../domain/patient.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['CNP', 'email', 'phone', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(
      (data: Patient[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goToPatientDetails(patientId: number){
    this.router.navigate([`/dashboard/doctor/patients/${patientId}`]);
  }
  
}
