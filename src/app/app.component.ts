import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-tbl-wizard';
  result: string ='';
  version: string;
  
  constructor(
    private electron: ElectronService,
    private chd: ChangeDetectorRef
  ) {
    this.electron.ipcRenderer
    .on('action-succeeded', (event, arg) => {
      this.result = this.result + '\n' + arg;
      this.chd.detectChanges();
    })
    .on('error', (event, arg) => {
      this.result = 'error: ' + arg;
      this.chd.detectChanges();
    })
    .on('main-version', (event, arg) => {
      this.version = "electron: " + arg.electron + " node: " + arg.node;
      this.chd.detectChanges();
    })
  }

  ngOnInit() {
    this.electron.ipcRenderer.send('version', true);
  }

  onAction() {
    this.electron.ipcRenderer.send('action', { 
      workingDir: "C:\\Users\\rinaldi\\Documents\\working\\standard\\applications",
      answers:  {
        appName: "myNewApp",
        defaultLibrary: "firstLibrary"
      }
    });
  } 
}
