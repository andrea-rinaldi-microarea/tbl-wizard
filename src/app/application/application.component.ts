import { WorkspaceService } from './../service/workspace.service';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor(
    private electron: ElectronService,
    private workspace: WorkspaceService    
  ) { }

  ngOnInit() {
  }

  onRun() {
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
