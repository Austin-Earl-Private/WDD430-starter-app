import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from "./contact.model";
import {MOCKCONTACTS} from "../../MOCKCONTACTS";
import {Document} from "../document/document.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[]
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  constructor() {
    this.contacts = MOCKCONTACTS;
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
    this.contactChangedEvent.emit([...this.contacts]);
  }

}
