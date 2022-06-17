import {Component, OnInit} from '@angular/core';
import {Message} from "../mesage.model";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService:MessageService) {

  }

  async ngOnInit(): Promise<void> {

    this.messages =this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages)=>this.messages = messages);
  }

  addMessage(event: Message) {
    this.messages.push(event);
  }
}
