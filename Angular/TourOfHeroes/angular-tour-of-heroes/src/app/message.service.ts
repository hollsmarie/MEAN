import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string [] = []; //creates an empty array of messages
  
  add(message: string) {
    this.messages.push(message); //pushes new messages into the string of messages 
  }

  clear(){
    this.messages = []; //clears tbe messages
  }
}
