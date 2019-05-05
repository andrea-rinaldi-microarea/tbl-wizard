import { Router } from '@angular/router';
import { MessagesService } from './../services/messages.service';
import { WorkspaceService } from './../services/workspace.service';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'tblw-select-workspace',
  templateUrl: './select-workspace.component.html',
  styleUrls: ['./select-workspace.component.scss']
})
export class SelectWorkspaceComponent implements OnInit {

  workspaceFolder: string;

  constructor(
    private workspace : WorkspaceService,
    private messages: MessagesService,
    private router: Router,
    private electron: ElectronService
  ) { }

  ngOnInit() {
    this.messages.clear();
    this.workspaceFolder = this.workspace.root();
  }

  onConfirm() {
    this.messages.clear();
    var res = this.workspace.check(this.workspaceFolder);
    if (res !== null) {
      this.messages.error(res);
    } else {
      this.workspace.set(this.workspaceFolder);
      this.router.navigateByUrl('/');
    }
  }

  onCancel() {
    this.messages.clear();
    this.router.navigateByUrl('/');
  }

  onBrowseWorkspace() {
    if (this.electron.isElectronApp) {
      var folders = this.electron.remote.dialog.showOpenDialog({title:'Workspace folder', defaultPath: this.workspaceFolder, properties: ["openDirectory"] });
      this.messages.clear();
      if (folders) {
        this.workspaceFolder = folders[0];
        var res = this.workspace.check(this.workspaceFolder);
        if (res !== null) {
          this.messages.error(res);
        }        
      }
    }

  }

}
