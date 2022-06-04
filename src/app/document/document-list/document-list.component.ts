import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Document} from "../document.model";
import {DocumentService} from "../document.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  // documents:Document[] = [new Document(1,"doc1","Document 1 test","URL",""),new Document(2,"doc2","Document 2 test","URL",""),new Document(3,"doc3","Document 3 test","URL",""),new Document(4,"doc4","Document 4 test","URL","")]
  documents:Document[] = [];
  subscription: Subscription;
  constructor(private documentService:DocumentService) { }

  ngOnInit(): void {
    this.documents =  this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent.subscribe((documents:Document[])=>this.documents= documents);
  }
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}
