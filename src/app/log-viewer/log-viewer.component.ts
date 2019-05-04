import { LogService } from './../service/log.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tblw-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit {

  constructor(
    public logger: LogService,
    private chd: ChangeDetectorRef
  ) { 
    // must subscribe to log changes for messages coming from the generator
    this.logger.changes().subscribe( entry => {
      this.chd.detectChanges();
    });
  }

  ngOnInit() {
  }

}
