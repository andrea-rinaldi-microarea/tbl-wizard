import { LogEntry } from 'src/models/log-entry';
import { Injectable } from '@angular/core';
import { GeneratorService } from './generator.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  log: LogEntry[] = [];
  private _changes$: Subject<LogEntry>;

  constructor(
    private generator: GeneratorService
  ) { 
    this._changes$ = new Subject<LogEntry>();
    this.generator.log().subscribe( (entry: LogEntry) => {
      this.log.push(entry);
      this._changes$.next(entry);
    });
  }

  add(entry: LogEntry) {
    this.log.push(entry);
  }

  info(message: string) {
    this.log.push(LogEntry.info(message));
  }

  // changes arriving from the generator are not in the Angular changes detection loop
  // subscribing to this Observable will allow to force a change detection
  changes(): Observable<LogEntry> {
    return this._changes$.asObservable();
  }
}
