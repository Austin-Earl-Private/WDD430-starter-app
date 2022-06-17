import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "./contact.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term:string): Contact[] {
    const filtered:Contact[] = [];
    for(let contact of contacts){
      if(contact.name.toLowerCase().includes(term)){
        filtered.push(contact)
      }
    }
    if(filtered.length == 0){
      return contacts;
    }else{
      return filtered
    }
  }

}
