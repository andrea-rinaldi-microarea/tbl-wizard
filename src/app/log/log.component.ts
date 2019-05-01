import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  log: string[] = [];

  constructor(
    private electron: ElectronService,
    private chd: ChangeDetectorRef
  ) { 
    if (this.electron.isElectronApp) {
      this.electron.ipcRenderer
      .on('log', (event, arg) => {
        this.log.push('[' + arg.status + '] ' + arg.arguments[0]);
        this.chd.detectChanges();
      })
    }
  }

  ngOnInit() {
  }

}
