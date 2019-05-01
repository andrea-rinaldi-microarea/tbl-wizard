import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor(
    private electron: ElectronService,
    private chd: ChangeDetectorRef    
  ) { }

  ngOnInit() {
  }

  onRun() {
    if (this.electron.isElectronApp) {
      this.electron.ipcRenderer.send('run', { 
        workingDir: "C:\\Users\\rinaldi\\Documents\\working\\standard\\applications",
        answers:  {
          appName: "myNewApp",
          defaultLibrary: "firstLibrary"
        }
      });
    }
  } 

}
