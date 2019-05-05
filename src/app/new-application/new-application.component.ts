import { GeneratorService } from '../services/generator.service';
import { LogService } from '../services/log.service';
import { WorkspaceService } from '../services/workspace.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RunArguments } from 'src/models/run-arguments';

@Component({
  selector: 'tblw-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor(
    private workspace: WorkspaceService,
    private logger: LogService,
    private generator: GeneratorService,
    private chd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onRun() {
    this.logger.info("Creating new app ...");
    this.generator.run(new RunArguments( 
      this.workspace.path(),
      {
        appName: "myNewApp",
        defaultLibrary: "firstLibrary"
      }))
    .subscribe( entry => {
      this.logger.add(entry);
      this.chd.detectChanges();
    });
  } 

}
