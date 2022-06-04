import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from "./contact.model";
import {ContactService} from "./contact.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  selectedContact:Contact;
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe((contact)=>{this.selectedContact = contact});
  }


}
