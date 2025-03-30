import { Component } from '@angular/core';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

  docList: Document[] | undefined;

  constructor(private docserv: DocumentService){
    this.docList=docserv.getDocumentsForPatient(233)!;
    console.log(this.docList);
  }
  
}
