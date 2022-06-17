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
    this.httpClient.get('https://cms-project-87bc7-default-rtdb.firebaseio.com/contacts.json').subscribe((contacts:Contact[])=>{
      this.contacts = contacts;
      this.maxId = this.getMaxId();
      promiseResolve();
      this.contactChangedEvent.next([...this.contacts]);
    })

  }

  storeContact() {
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.httpClient.put('https://cms-project-87bc7-default-rtdb.firebaseio.com/contacts.json',this.contacts,{headers}).subscribe(()=>{
      this.contactChangedEvent.next([...this.contacts]);
    })
  }
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
    this.contacts.splice(pos,1);
    // this.contactChangedEvent.emit([...this.contacts]);
    // this.contactChangedEvent.next([...this.contacts]);
    this.storeContact()

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
    this.contacts[pos] = newContact;
    // this.contactChangedEvent.next([...this.contacts]);
this.storeContact()
  }

  addContact(contact:Contact){
    if(!contact){
      return
    }
    this.maxId++
    contact.id = this.maxId+'';
    this.contacts.push(contact);
    // this.contactChangedEvent.next([...this.contacts]);
    this.storeContact()

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

}
