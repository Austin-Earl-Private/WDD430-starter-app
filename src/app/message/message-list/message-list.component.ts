import {Component, OnInit} from '@angular/core';
import {Message} from "../mesage.model";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [new Message(1, "Subject1", "Message 1 test", "System"), new Message(2, "Subject2", "Message 2 test", "System"), new Message(3, "Subject3", "Message 3 test", "System")];

  constructor() {
  }

  ngOnInit(): void {
  }

  addMessage(event: Message) {
    this.messages.push(event);
  }
}
