import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../contact.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact:Contact;
  constructor(private router: Router, private route:ActivatedRoute, private contactService:ContactService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.contact =this.contactService.getContact(params['id'])
    })
  }

  deleteContact(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts'])
  }

}
