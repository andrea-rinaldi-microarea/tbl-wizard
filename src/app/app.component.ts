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
  version: string;
  
  constructor(
    private modalService: NgbModal,
    private workspace: WorkspaceService
  ) {
    this.workspace.set("C:\\Users\\rinaldi\\Documents\\working");
  }

  ngOnInit() {
  }

  about() {
    this.modalService.open(AboutComponent);
  }

}
