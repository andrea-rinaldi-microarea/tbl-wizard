import { Injectable } from '@angular/core';

export enum MessageType {
  error,
  warning,
  success,
  info
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string;
  details: string;
  show: boolean = false;
  type: MessageType;

  constructor() { }

  error(message: string, details?: string) {
    this.message = message;
    this.details = details ? details : null;
    this.show = true;
    this.type = MessageType.error;
  }

  success(message: string) {
    this.message = message;
    this.show = true;
    this.type = MessageType.success;
  }

  info(message: string) {
    this.message = message;
    this.show = true;
    this.type = MessageType.info;
  }

  clear() {
    this.message = null;
    this.details = null;
    this.show = false;
  }

}
