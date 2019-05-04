import { WorkspaceService } from './service/workspace.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Task Builder Legacy Wizard';
  version: string;
  
  constructor(
    private modalService: NgbModal,
    private workspace: WorkspaceService
  ) {
    // this.workspace.set("C:\\Users\\rinaldi\\Documents\\working\\standard\\applications");
  }

  ngOnInit() {
  }

  about() {
    this.modalService.open(AboutComponent);
  }

}
