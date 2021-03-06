import { Component, OnInit } from '@angular/core';
import {Document} from "./document.model";
import {DocumentService} from "./document.service";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.selectedDocumentEvent.subscribe((doc)=>this.selectedDocument = doc)
  }

}
