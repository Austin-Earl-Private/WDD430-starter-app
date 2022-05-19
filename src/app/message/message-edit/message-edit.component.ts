import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from "../mesage.model";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = '7';

  // @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('message') message: ElementRef;
  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onSendMessage() {
    console.log("sending message")
    const subject = this.subject.nativeElement.value;
    const content = this.message.nativeElement.value;
    const message = new Message(new Date().getUTCMilliseconds()+'', subject, content, this.currentSender);
    console.log(message)
    this.messageService.addMessage(message);
  }

  onClearMessage() {
    this.subject.nativeElement.value = '';
    this.message.nativeElement.value = '';
  }
}
