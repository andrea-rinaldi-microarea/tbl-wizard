import { LogService } from './../service/log.service';
import { WorkspaceService } from './../service/workspace.service';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'tblw-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor(
    private electron: ElectronService,
    private workspace: WorkspaceService,
    private logger: LogService    
  ) { }

  ngOnInit() {
  }

  onRun() {
    this.logger.info("Creating new app ...");
    if (this.electron.isElectronApp) {
      this.electron.ipcRenderer.send('run', { 
        workingDir: this.workspace.path(),
        answers:  {
          appName: "myNewApp",
          defaultLibrary: "firstLibrary"
        }
      });
    }
  } 

}
