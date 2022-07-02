import {EventEmitter, Injectable} from '@angular/core';
import {Message} from "./mesage.model";
import {MOCKMESSAGES} from "../../MOCKMESSAGES";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Document} from "../document/document.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxid:number;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get(`http://localhost:3000/messages`).subscribe((messages:Message[])=>{
      this.messages = messages;
      this.maxid = this.getMaxId();
      this.sortAndSend();
    })
  }

  getMessages():Message[]{

    return [...this.messages]
  }
  getMessage(id:string):Message {
    for(const message of this.messages){
      if(message.id === id){
        return message;
      }
    }
    return null;
  }

  // storeMessages(){
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type','application/json');
  //   this.httpClient.put('https://cms-project-87bc7-default-rtdb.firebaseio.com/messages.json',this.messages,{headers}).subscribe(()=>{
  //     this.messageChangedEvent.emit([...this.messages]);
  //   })
  // }
  addMessage(message:Message){
    message.id=''
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, document: Message }>('http://localhost:3000/messages',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.document);
          this.sortAndSend();
        }
      );
  }
  getMaxId():number {
    let maxid= 0;
    for(let message of this.messages){
      const id =+message.id;
      if(id > maxid){
        maxid =id;
      }
    }
    return maxid;
  }

  sortAndSend(){
    this.messages = this.messages.sort((mes1,mes2)=>{
      return parseInt(mes1.id)-parseInt(mes2.id);
    })
    this.messageChangedEvent.next([...this.messages])
  }
}
