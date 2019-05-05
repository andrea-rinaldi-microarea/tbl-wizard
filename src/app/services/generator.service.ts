import { LogEntry } from 'src/models/log-entry';
import { Versions } from 'src/models/versions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { RunArguments } from 'src/models/run-arguments';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(
    private electron: ElectronService
  ) { }

  getVersions() : Observable<Versions> {
    var version$ = new Observable<Versions> ( observer => {
      if (this.electron.isElectronApp) {
        this.electron.ipcRenderer
        .on('getVersions-response', (event, ver: Versions) => {
          observer.next(ver);
          observer.complete();
        })
        .send('getVersions');
      } else {
        observer.next(new Versions("?.?", "?.?"));
        observer.complete();
      } 
    });

    return version$;
  }

  log() : Observable<LogEntry> {
    var log$ = new Observable<LogEntry> ( observer => {
      if (this.electron.isElectronApp) {
        this.electron.ipcRenderer
        .on('log', (event, log: LogEntry) => {
          observer.next(log);
        });
      }
    });

    return log$;
  }

  run(args: RunArguments): Observable<LogEntry> {
    var run$ = new Observable<LogEntry> ( observer => {
      if (this.electron.isElectronApp) {
        this.electron.ipcRenderer
        .on('run-response', (event, entry: LogEntry) => {
          observer.next(entry);
          observer.complete();
        })
        .send('run', args);
      } else {
        observer.next(LogEntry.success("completed"));
        observer.complete();
      }
    });

    return run$;
  }
}
