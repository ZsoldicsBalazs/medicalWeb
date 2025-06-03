import { Component, OnInit, ViewChild } from '@angular/core';
import { Procedure } from '../../domain/procedure.model';
import { ProceduresService } from '../../services/procedures.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DoctorService } from '../../services/doctor.service';
import { DoctorProcedure } from '../../domain/doctor-procedure.model';
import { NotificationService } from '../../services/notification.service';

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

 displayedColumns: string[] = ['#', 'codDRG', 'description', 'actions'];
  // Termenul de căutare introdus de utilizator
 searchTerm: string = '';
 totalProcedures: number = 0;
 addedProcedures: DoctorProcedure[] = [];
 dataSource = new MatTableDataSource<Procedure>();
 @ViewChild(MatPaginator) paginator!: MatPaginator;


// 
showModal: boolean = false;
selectedProcedure!: Procedure;
inputPrice: string = '';
selectedDoctorProcedure!: DoctorProcedure;
editFlag=false;

 constructor(private procedureService: ProceduresService, private doctorService: DoctorService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.procedureService.getAllProcedures().subscribe((procedures: Procedure[]) => {
      this.allProcedures = procedures; 
      this.dataSource.data = procedures;
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 5;
      
    });
    this.getDoctorProcedures();
  }

  getDoctorProcedures(){
    this.doctorService.getAllProceduresByDrId(localStorage.getItem("profileID")!).subscribe(
      (data) => {
        this.addedProcedures = data;
      }, 
      error => {console.log(`eroare fetch + ${error}`)}
    )
  }

  // Metoda pentru filtrare locala
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

  
  // Deschide modalul pentru a introduce prețul
  openModal(proc: any,flag: boolean): void {
    if(flag){
      this.editFlag=flag;
      this.selectedDoctorProcedure=proc;
      this.inputPrice=this.selectedDoctorProcedure.price;
      console.log(this.selectedDoctorProcedure);
      console.log("flag is "+ this.editFlag)
      
    }else{
      this.editFlag=false;
      this.inputPrice="";
    this.selectedProcedure = proc;
    
    console.log(this.selectedProcedure);
  }
    
    // this.inputPrice = '';
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
          (data) => {
            this.addedProcedures.push(data);
            this.notificationService.notify('success','Procedure add',data.description+" has been added"
            )
          },
          (error)=> {console.log(error)}
        )
        
      }
    }
    this.closeModal();
  }



  updatePrice(){
    
    this.showModal = true;
    this.selectedDoctorProcedure.price=this.inputPrice;
    this.doctorService.updateProcedureToDr(localStorage.getItem("profileID")!,this.selectedDoctorProcedure).subscribe(
      (data)=>{
        this.selectedDoctorProcedure=data;
        console.log(data);
      },
      (error)=> {console.log(error)}
    );

    this.closeModal();
  };

  deleteProcedure(proc: DoctorProcedure) {
    this.doctorService.deleteDoctorProcedure(localStorage.getItem("profileID")!,proc.procedure_id).subscribe(
      (data) => {
        if(data){
          console.log("selected element deleted!");
          this.addedProcedures=this.addedProcedures.filter(lproc => lproc.id!==proc.id);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
    }

  

}
