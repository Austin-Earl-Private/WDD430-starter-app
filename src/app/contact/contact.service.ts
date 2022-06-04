import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "../../MOCKCONTACTS";
import {Document} from "../document/document.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[]
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new Subject<Contact[]>();
  maxId:number;
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxId = this.getMaxId();
  }

  getContacts():Contact[]{
    return [...this.contacts];
  }

  getContact(id:string):Contact{
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
    this.contactChangedEvent.next([...this.contacts]);

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
    this.contactChangedEvent.next([...this.contacts]);

  }

  addContact(contact:Contact){
    if(!contact){
      return
    }
    this.maxId++
    contact.id = this.maxId+'';
    this.contacts.push(contact);
    this.contactChangedEvent.next([...this.contacts]);
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
