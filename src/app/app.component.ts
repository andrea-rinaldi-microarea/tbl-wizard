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
  log: string[] = [];
  version: string;
  prompt: boolean = false;
  
  constructor(
    private electron: ElectronService,
    private chd: ChangeDetectorRef
  ) {
    this.electron.ipcRenderer
    .on('main-version', (event, arg) => {
      this.version = "electron: " + arg.electron + " node: " + arg.node;
      this.chd.detectChanges();
    })
    .on('log', (event, arg) => {
      this.log.push('[' + arg.status + '] ' + arg.arguments[0]);
      this.chd.detectChanges();
    })
    .on('conflicts-prompt', (event, arg) => {
      this.log.push(arg.questions[0].message);
      this.prompt = true;
      this.chd.detectChanges();
    })
  }

  ngOnInit() {
    this.electron.ipcRenderer.send('version', true);
  }

  onRun() {
    this.electron.ipcRenderer.send('run', { 
      workingDir: "C:\\Users\\rinaldi\\Documents\\working\\standard\\applications",
      answers:  {
        appName: "myNewApp",
        defaultLibrary: "firstLibrary"
      }
    });
  } 

  onOverwrite() {
    this.electron.ipcRenderer.send('conflicts-prompt-answered', { 
      action: 'write' 
    });
  } 
  onAbort() {
    this.electron.ipcRenderer.send('conflicts-prompt-answered', { 
      action: 'abort' 
    });
  } 
}
