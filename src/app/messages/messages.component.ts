import { Component, OnInit } from '@angular/core';
import { MessageType, MessagesService } from '../services/messages.service';

@Component({
  selector: 'tblw-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

  alertClass() {
    switch (this.messagesService.type) {
      case MessageType.error: return "alert-danger";
      case MessageType.warning: return "alert-warning";
      case MessageType.success: return "alert-success";
      default: return "alert-secondary"; 
    }
  }

  getTitle() {
    switch (this.messagesService.type) {
      case MessageType.error: return "Error!";
      case MessageType.warning: return "Warning!";
      case MessageType.success: return "Success!";
      default: return "Info -"; 
    }
  }

}
