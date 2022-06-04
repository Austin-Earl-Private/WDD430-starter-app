import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {MOCKDOCUMENTS} from "../../MOCKDOCUMENTS";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents:Document[] = []
  selectedDocumentEvent =  new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new Subject<Document[]>();
  maxId:number;
  constructor() {
    this.documents = MOCKDOCUMENTS
    this.maxId = this.getMaxId();
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

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.emit([...this.documents]);
    this.documentChangedEvent.next([...this.documents]);

  }

  updateDocument(oldDocument:Document,newDocument:Document){
    if(!oldDocument || !newDocument){
      return
    }
    const pos = this.documents.indexOf(oldDocument);
    if(pos<0){
      return;
    }
    newDocument.id = oldDocument.id;
    this.documents[pos] = newDocument;
    this.documentChangedEvent.next([...this.documents]);

  }

  addDocument(document:Document){
    if(!document){
      return
    }
    this.maxId++
    document.id = this.maxId+'';
    this.documents.push(document);
    this.documentChangedEvent.next([...this.documents]);
  }

  getMaxId():number {
    let maxid= 0;
    for(let documentItem of this.documents){
      const id =+documentItem.id;
      if(id > maxid){
        maxid =id;
      }
    }
    return maxid;
  }
}
