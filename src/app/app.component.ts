import { GeneratorService } from './service/generator.service';
import { WorkspaceService } from './service/workspace.service';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Versions } from 'src/models/versions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Task Builder Legacy Wizard';
  version: string;
  
  constructor(
    private chd: ChangeDetectorRef,
    private workspace: WorkspaceService,
    private generator: GeneratorService
  ) {
    this.workspace.set("C:\\Users\\rinaldi\\Documents\\working\\standard\\applications");
  }

  ngOnInit() {
    this.generator.getVersions().subscribe( (ver: Versions) => {
      this.version =  "electron: " + ver.electron + " node: " + ver.node;
      this.chd.detectChanges();
    })
  }

}
