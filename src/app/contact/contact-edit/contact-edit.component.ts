import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact:Contact;
  originalContact: Contact;
  groupContacts:Contact[] = [];
  editMode = false;
  id: string;
  invalidContact = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) =>{
      const id = params['id'];
      if(!id){
        this.editMode = false;
        return;
      }
      this.originalContact =  await this.contactService.getContact(id);
      if(!this.originalContact){
        return;
      }
      this.editMode = true;
      this.contact = {...this.originalContact};
      if(this.contact.group){
        this.groupContacts = this.contact.group;
      }
    })
  }
  onCancel(){
    this.router.navigate(['/contacts'])
  }
  onSubmit(form:NgForm){
    this.contact.name = form.value.name;
    this.contact.email = form.value.email;
    this.contact.phone = form.value.phone;
    this.contact.imageUrl = form.value.imageUrl;
    this.contact.group = this.groupContacts;
    this.contactService.updateContact(this.originalContact, this.contact)
    this.router.navigate(['/contacts'])

  }
  onRemoveItem(index:number){
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.invalidContact = false;
  }
  addToGroup(event:any){
    const selectedContact = event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if(invalidGroupContact){
      this.invalidContact = true;
      return;
    }
    this.invalidContact = false;

    this.groupContacts.push(selectedContact);
  }
  isInvalidContact(newContact: Contact) {
    if(!newContact){
      return true;
    }
    if(this.contact && newContact.id === this.contact.id){
      return true;
    }
    for(let contactItem of this.groupContacts){
      if(newContact.id === contactItem.id){
        return true;
      }
    }
    return false;
  }

}
