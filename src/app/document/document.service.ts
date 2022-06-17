import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {MOCKDOCUMENTS} from "../../MOCKDOCUMENTS";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents:Document[] = []
  selectedDocumentEvent =  new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new Subject<Document[]>();
  maxId:number;
  constructor(private httpClient: HttpClient) {
    httpClient.get(`https://cms-project-87bc7-default-rtdb.firebaseio.com/documents.json`).subscribe(
      (documents:Document[] )=>{
        this.documents = documents;
        this.maxId = this.getMaxId();
        this.documents.sort((doc1,doc2)=>{
          return parseInt(doc1.id) - parseInt(doc2.id);
        })
        this.documentChangedEvent.next([...this.documents]);
      },
    (error:any)=>{
        console.error(error);
    }
    )
    this.documents = MOCKDOCUMENTS
    this.maxId = this.getMaxId();
  }

  storeDocuments() {
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.httpClient.put('https://cms-project-87bc7-default-rtdb.firebaseio.com/documents.json',this.documents,{headers}).subscribe(()=>{
      this.documentChangedEvent.next([...this.documents]);
    })
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
    this.storeDocuments()
    // // this.documentChangedEvent.emit([...this.documents]);
    // this.documentChangedEvent.next([...this.documents]);

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
    // this.documentChangedEvent.next([...this.documents]);
    this.storeDocuments()
  }

  addDocument(document:Document){
    if(!document){
      return
    }
    this.maxId++
    document.id = this.maxId+'';
    this.documents.push(document);
    // this.documentChangedEvent.next([...this.documents]);
    this.storeDocuments()
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
