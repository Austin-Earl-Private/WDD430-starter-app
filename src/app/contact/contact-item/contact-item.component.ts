import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../contact.model";
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  // @Input()
  @Input() contact: Contact;
  constructor() { }


  ngOnInit(): void {

  }

}
