import { WorkspaceService } from './service/workspace.service';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-tbl-wizard';
  version: string;
  
  constructor(
    private electron: ElectronService,
    private chd: ChangeDetectorRef,
    private workspace: WorkspaceService
  ) {
    // this.workspace.set("C:\\Users\\rinaldi\\Documents\\working\\standard\\applications");
    if (this.electron.isElectronApp) {
      this.electron.ipcRenderer
      .on('main-version', (event, arg) => {
        this.version = "electron: " + arg.electron + " node: " + arg.node;
        this.chd.detectChanges();
      })
    }
  }

  ngOnInit() {
    if (this.electron.isElectronApp) {
      this.electron.ipcRenderer.send('version', true);
    }
  }

}
