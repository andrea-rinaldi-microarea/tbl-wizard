import { GeneratorService } from './../service/generator.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LogEntry } from 'src/models/log-entry';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  log: string[] = [];

  constructor(
    private chd: ChangeDetectorRef,
    private generator: GeneratorService
  ) { 
    this.generator.log().subscribe( (log: LogEntry) => {
      this.log.push('[' + log.status + '] ' + log.message);
      this.chd.detectChanges();
    });
  }

  ngOnInit() {
  }

}
