import { Component, OnInit, ViewChild } from '@angular/core';
import { Procedure } from '../domain/procedure.model';
import { ProceduresService } from '../services/procedures.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DoctorService } from '../services/doctor.service';
import { DoctorProcedure } from '../domain/doctor-procedure.model';

@Component({
  selector: 'app-doctor-procedure',
  templateUrl: './doctor-procedure.component.html',
  styleUrl: './doctor-procedure.component.css'
})
export class DoctorProcedureComponent implements OnInit {

 // Lista completă de proceduri
 allProcedures: Procedure[] = [];
 // Lista filtrată ce va fi afișată
 filteredProcedures: Procedure[] = [];
 // Termenul de căutare introdus de utilizator
 displayedColumns: string[] = ['#', 'codDRG', 'description', 'actions'];
 searchTerm: string = '';
 totalProcedures: number = 0;
 addedProcedures: DoctorProcedure[] = [];
 dataSource = new MatTableDataSource<Procedure>();
 @ViewChild(MatPaginator) paginator!: MatPaginator;


// 
showModal: boolean = false;
selectedProcedure!: Procedure;
inputPrice: string = '';
// 



  // Deschide modalul pentru a introduce prețul
  openModal(proc: Procedure): void {
    this.selectedProcedure = proc;
    this.inputPrice = '';
    this.showModal = true;
  }

  // Închide modalul
  closeModal(): void {
    this.showModal = false;
  }

  confirmAdd(): void {
    if (this.inputPrice && parseFloat(this.inputPrice) >= 0) {
      const dp: DoctorProcedure = {
        id: "",
        doctor_id: localStorage.getItem("profileID")!,
        procedure_id: this.selectedProcedure.id,
        price: this.inputPrice,
        description: this.selectedProcedure.description
      };
      // Adaugă procedura doar dacă nu este deja adăugată
      if (!this.addedProcedures.find(p => p.procedure_id === dp.procedure_id)) {
        this.doctorService.addProcedureToDr(dp.doctor_id,dp).subscribe(
          (data) => {this.addedProcedures.push(data)},
          (error)=> {console.log(error)}
        )
        
      }
    }
    this.closeModal();
  }




 constructor(private procedureService: ProceduresService, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.procedureService.getAllProcedures().subscribe((procedures: Procedure[]) => {
      this.allProcedures = procedures; 
      this.dataSource.data = procedures;
      // Setează paginatorul și pagină cu 5 elemente
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 5;
      
    });
    this.getDoctorProcedures();
  }

  getDoctorProcedures(){
    this.doctorService.getAllProceduresByDrId(localStorage.getItem("profileID")!).subscribe(
      (data) => {
        this.addedProcedures = data;
        console.log(data);
        console.log("all procedures loaded");
      }, 
      error => {console.log("eroare fetch")}
    )
  }

  // Metodă pentru filtrare locală
  searchProcedures(): void {
    const term = this.searchTerm.toLowerCase();
    if (term) {
      const filtered = this.allProcedures.filter(proc =>
        proc.description.toLowerCase().includes(term)
      );
      this.dataSource.data = filtered;
    } else {
      // Dacă searchTerm este gol, afișează toate procedurile
      this.dataSource.data = this.allProcedures;
    }
    // Resetează pagina la prima pagină
    this.paginator.firstPage();
  }

  addProcedure(proc: Procedure): void {
    // Adaugă procedura în lista de proceduri adăugate dacă nu există deja



    if (!this.addedProcedures.find(p => p.id === proc.id)) {
      // this.addedProcedures.push(proc);
      console.log("This method not implemented yet!")
    }
  }

}
