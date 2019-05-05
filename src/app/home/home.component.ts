import { WorkspaceService } from './../services/workspace.service';
import { MessagesService } from './../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tblw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public applications: string[];

  constructor(
    private router: Router,
    private messages: MessagesService,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    if (this.workspace.isEmpty()) {
      this.messages.info("You have no workspace defined, click on the <a href='#/select-workspace'>Open</a> option to select one.");
    } else {
      this.applications = this.workspace.applicationsList();
    }
  }

  onCreateApplication() {
    this.router.navigateByUrl('/application');
  }
}
