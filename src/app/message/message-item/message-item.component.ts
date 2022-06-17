import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../mesage.model";
import {ContactService} from "../../contact/contact.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  constructor(private contactService:ContactService) { }

  async ngOnInit(): Promise<void> {
    const contact = await this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;

  }

}
