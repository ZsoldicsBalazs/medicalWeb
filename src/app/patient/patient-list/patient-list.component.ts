import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../domain/patient.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['CNP', 'email', 'phone', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<Patient>();
  searchTerm: String = "";
  patientList: Patient[]= [];
  displayedPatients: any[] = []; // Pacienții afișați
  patientsToShow: number = 10; // Câți pacienți sunt vizibili inițial
  loadMoreStep: number = 5; // Câți pacienți se încarcă la fiecare click


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isMobile: boolean = false;

  constructor(private patientService: PatientService, private router: Router, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchPatients();
    console.log('Before observe:', this.isMobile);
  
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
      .pipe(
        map(result => result.matches),
        shareReplay()
      )
      .subscribe(isHandset => {
        this.isMobile = isHandset;
        this.updateDisplayedPatients();
        console.log('After observe:', this.isMobile);
        this.cdr.detectChanges(); 
        
      });
  }

  fetchPatients():void{
    this.patientService.getPatients().subscribe(
      (data: Patient[]) => {
        this.dataSource.data = data;
        this.patientList=data;
        this.displayedPatients = this.patientList.slice(0, this.patientsToShow);
      },
      error => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // goToPatientDetails(patientId: number){
    
  //   this.router.navigate([`/dashboard/doctor/patients/${patientId}`]);
  // }

  searchByNameOrCNP(){
    this.patientService.getPatientsBySearch(this.searchTerm).subscribe(
      patients => {
        this.dataSource.data=patients;
        this.patientList=patients;
        this.displayedPatients = this.patientList.slice(0, this.patientsToShow);
      },
      error => {
        console.log(error);
      }
    )
  }

  loadMore() {
    this.patientsToShow += this.loadMoreStep;
    this.updateDisplayedPatients();
  }
  
  updateDisplayedPatients() {
    this.displayedPatients = this.patientList.slice(0, this.patientsToShow);
  }
  
}
