import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Contact} from "../contact.model";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts:Contact[] = [new Contact(1,"R. Kent Jackson","jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", []),
    new Contact(2,"Rex Barzee","barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", [])];
  constructor() { }
  @Output() selectedContact:EventEmitter<Contact> = new EventEmitter<Contact>();

  ngOnInit(): void {
  }

  onSelected(contact:Contact) {
    console.log("selected Contact"+contact)
    this.selectedContact.emit(contact);
  }

}
