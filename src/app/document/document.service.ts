import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {MOCKDOCUMENTS} from "../../MOCKDOCUMENTS";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents:Document[] = []
  selectedDocumentEvent =  new EventEmitter<Document>();
  constructor() {
    this.documents = MOCKDOCUMENTS
  }
  getDocuments():Document[]{
    return [...this.documents]
  }

  getDocument(id: string):Document {
    for(const document of this.documents){
      if(document.id === id){
        return document;
      }
    }
    return null;
  }

  selectDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
