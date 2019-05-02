import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  
  private _path: string = null;
  private _name: string = null;

  constructor() { }

  set(newPath: string) : void {
    this._path = newPath;
    var folders = this._path.split("\\");
    // the name is the folder containing "\standard\applications"
    this._name = folders[folders.length - 2 - 1];
  }

  path():  string {
    return this._path;
  }

  name() : string {
    return this._name;
  }
}