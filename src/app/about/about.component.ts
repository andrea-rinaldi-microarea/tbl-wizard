import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneratorService } from '../services/generator.service';
import { Versions } from 'src/models/versions';

@Component({
  selector: 'tblw-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  version: string;
  
  constructor(
    public activeModal: NgbActiveModal,
    private generator: GeneratorService,
    private chd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.generator.getVersions().subscribe( (ver: Versions) => {
      this.version =  "electron: " + ver.electron + " node: " + ver.node;
      this.chd.detectChanges();
    })
  }

}
