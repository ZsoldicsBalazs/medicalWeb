import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import {Document} from '../../domain/documents.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Input() patientId!: string;
  
  docList: Document[] = [];
  

  constructor(private docserv: DocumentService){
  
  }
  ngOnInit(): void {
    this.docserv.getDocumentsForPatient(this.patientId).subscribe(
      data=> {
        this.docList=data;
        console.log(this.docList);
      },
      error => {console.log(error)

      }
    
    )
  }

  
  
}
