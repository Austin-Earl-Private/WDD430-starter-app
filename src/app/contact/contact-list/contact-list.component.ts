import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts:Contact[] = [];
  subscription: Subscription;
  term:string= '';
  // contacts:Contact[] = [new Contact('1',"R. Kent Jackson","jacksonk@byui.edu", "208-496-3771", "../../assets/images/jacksonk.jpg", []),
  //   new Contact('2',"Rex Barzee","barzeer@byui.edu", "208-496-3768", "../../assets/images/barzeer.jpg", [])];
  constructor(private contactService:ContactService) { }
  // @Output() selectedContact:EventEmitter<Contact> = new EventEmitter<Contact>();

  async ngOnInit(): Promise<void> {
    this.contacts = await this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts:Contact[])=>{this.contacts = contacts})

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(value:string){
    console.log(value)
    this.term = value.toLowerCase();
  }


}
