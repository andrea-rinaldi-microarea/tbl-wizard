import { Versions } from '../../models/versions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(
    private electron: ElectronService
  ) { }

  getVersions() : Observable<Versions> {
    var $version = new Observable<Versions> ( observer => {
      if (this.electron.isElectronApp) {
        this.electron.ipcRenderer
        .on('getVersions-response', (event, ver: Versions) => {
          observer.next(ver);
          observer.complete();
        })
        .send('getVersions', true);
      } else {
        observer.next(new Versions("?.?", "?.?"));
        observer.complete();
      } 
    });

    return $version;
  }
}
