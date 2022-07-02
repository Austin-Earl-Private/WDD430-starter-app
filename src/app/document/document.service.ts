import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {MOCKDOCUMENTS} from "../../MOCKDOCUMENTS";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents:Document[] = []
  selectedDocumentEvent =  new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentChangedEvent = new Subject<Document[]>();
  maxId:number;
  constructor(private httpClient: HttpClient, private router: Router) {
    httpClient.get(`http://localhost:3000/documents`).subscribe(
      (documents:Document[] )=>{
        this.documents = documents;
        this.maxId = this.getMaxId();
        this.sortAndSend()
        // this.documents.sort((doc1,doc2)=>{
        //   return parseInt(doc1.id) - parseInt(doc2.id);
        // })
        // this.documentChangedEvent.next([...this.documents]);
      },
    (error:any)=>{
        console.error(error);
    }
    )
    // this.documents = MOCKDOCUMENTS
    // this.maxId = this.getMaxId();
  }

  // storeDocuments() {
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type','application/json');
  //   this.httpClient.put('https://cms-project-87bc7-default-rtdb.firebaseio.com/documents.json',this.documents,{headers}).subscribe(()=>{
  //     this.documentChangedEvent.next([...this.documents]);
  //   })
  // }
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
    this.httpClient.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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
    newDocument._id = oldDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3000/documents/' + oldDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  addDocument(document:Document){
    if(!document){
      return
    }
    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
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
  sortAndSend(){
    this.documents = this.documents.sort((mes1,mes2)=>{
      return parseInt(mes1.id)-parseInt(mes2.id);
    })
    this.documentChangedEvent.next([...this.documents])
  }
}
