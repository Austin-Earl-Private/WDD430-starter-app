import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "../../MOCKCONTACTS";
import {Document} from "../document/document.model";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxId:number;
  init:Promise<void>;
  constructor(private httpClient:HttpClient) {
    let promiseResolve, promiseReject;
    this.init = new Promise((res,rej)=>{
      promiseResolve = res;
      promiseReject =rej;
    })
    this.httpClient.get('http://localhost:3000/contacts').subscribe((contacts:Contact[])=>{
      this.contacts = contacts;
      // this.maxId = this.getMaxId();
      promiseResolve();
      this.sortAndSend();
      // this.contactChangedEvent.next([...this.contacts]);
    })

  }

  // storeContact() {
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type','application/json');
  //   this.httpClient.put('https://cms-project-87bc7-default-rtdb.firebaseio.com/contacts.json',this.contacts,{headers}).subscribe(()=>{
  //     this.contactChangedEvent.next([...this.contacts]);
  //   })
  // }
  async getContacts():Promise<Contact[]>{
    await this.init;
    return [...this.contacts];
  }

  async getContact(id:string):Promise<Contact>{
    await this.init;
    for(const contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
    return null;
  }

  selectContact(contact:Contact) {
    this.contactSelectedEvent.emit(contact);
  }
  deleteContact(contact:Contact) {
    if(!contact){
      return;
    }
    const pos =this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );

  }

  updateContact(oldContact:Contact,newContact:Contact){
    if(!oldContact || !newContact){
      return
    }
    const pos = this.contacts.indexOf(oldContact);
    if(pos<0){
      return;
    }
    newContact.id = oldContact.id;
    newContact._id = oldContact._id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3000/contacts/' + oldContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  addContact(contact:Contact){
    if(!contact){
      return
    }
    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, document: Contact }>('http://localhost:3000/documents',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.document);
          this.sortAndSend();
        }
      );

  }

  getMaxId():number {
    let maxid= 0;
    for(let contactItem of this.contacts){
      const id =+contactItem.id;
      if(id > maxid){
        maxid =id;
      }
    }
    return maxid;
  }

  sortAndSend(){
    this.contacts = this.contacts.sort((mes1,mes2)=>{
      return parseInt(mes1.id)-parseInt(mes2.id);
    })
    this.contactChangedEvent.next([...this.contacts])
  }

}
