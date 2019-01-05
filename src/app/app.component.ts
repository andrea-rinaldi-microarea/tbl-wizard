import { Component, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-tbl-wizard';
  result: string ='';
  
  constructor(
    private electron: ElectronService,
    private chd: ChangeDetectorRef
  ) {
    this.electron.ipcRenderer.on('action-succeeded', (event, arg) => {
      this.result = this.result + '\n' + arg;
      this.chd.detectChanges();
    })
  }

  onAction() {
    this.electron.ipcRenderer.send('action', true);
  } 
}
